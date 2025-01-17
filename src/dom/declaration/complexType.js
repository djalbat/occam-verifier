"use strict";

import dom from "../../dom";

import { objectType } from "../type";
import { domAssigned } from "../../dom";

export default domAssigned(class ComplexTypeDeclaration {
  constructor(fileContext, type) {
    this.fileContext = fileContext;
    this.type = type;
  }

  getFileContext() {
    return this.fileContext;
  }

  getType() {
    return this.type;
  }

  getString() { return this.type.getString(); }

  verify() {
    let verified = false;

    const complexTypeDeclarationString = this.getString();

    this.fileContext.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration...`);

    const typeVerified = this.verifyType(this.type);

    if (typeVerified) {
      const includeSuperType = false,
            properties = this.type.getProperties(includeSuperType),
            propertiesVerified = this.verifyProperties(properties, this.type);

      if (propertiesVerified) {
        this.fileContext.addType(this.type);

        verified = true;
      }
    }

    if (verified) {
      this.fileContext.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration.`);
    }

    return verified;
  }

  verifyType(type) {
    let typeVerified = false;

    const typeString = type.getString(); ///

    this.fileContext.trace(`Verifying the '${typeString}' type...`);

    const typeName = type.getName(),
          typePresent = this.fileContext.isTypePresentByTypeName(typeName);

    if (typePresent) {
      const typeString = type.getString();

      this.fileContext.debug(`The '${typeString}' type is already present.`);
    } else {
      let superType;

      superType = type.getSuperType();

      const superTypeName = superType.getName();

      superType = this.fileContext.findTypeByTypeName(superTypeName);

      if (superType === null) {
        const superTypeString = superType.getString();

        this.fileContext.debug(`The super-type '${superTypeString}' is not present.`);
      } else {
        type.setSuperType(superType);

        typeVerified = true;
      }
    }

    if (typeVerified) {
      this.fileContext.debug(`...verified the '${typeString}' type.`);
    }

    return typeVerified;
  }

  verifyProperty(property, properties, superTypeProperties) {
    let propertyVerified = false;

    const propertyString = property.getString();

    this.fileContext.trace(`Verifying the '${propertyString}' property...`);

    const propertyNames = property.getNames(),
          count = properties.reduce((count, property) => {
            const propertyNamesMatch = property.matchPropertyNames(propertyNames);

            if (propertyNamesMatch) {
              count++;
            }

            return count;
          }, 0);

    if (count > 1) {
      this.fileContext.debug(`The '${propertyString}' property appears more than once.`);
    } else {
      const superTypeProperty = superTypeProperties.find((superTypeProperty) => {
        const propertyNameMatches = superTypeProperty.matchPropertyNames(propertyNames);

        if (propertyNameMatches) {
          return true;
        }
      }) || null;

      if (superTypeProperty !== null) {
        const superTypePropertyString = superTypeProperty.getString();

        this.fileContext.debug(`The '${propertyString}' property matches the super type's '${superTypePropertyString}' property.`);
      } else {
        let propertyType;

        propertyType = property.getType();

        const propertyTypeVerified = this.verifyPropertyType(propertyType);

        if (propertyTypeVerified) {
          const propertyTypeName = propertyType.getName();

          propertyType = this.fileContext.findTypeByTypeName(propertyTypeName);

          const type = propertyType;  ///

          property.setType(type);

          propertyVerified = true;
        }
      }
    }

    if (propertyVerified) {
      this.fileContext.debug(`verified the '${propertyString}' property.`);
    }

    return propertyVerified;
  }

  verifyProperties(properties, type) {
    let propertiesVerified;

    const superType = type.getSuperType(),
          superTypeProperties = superType.getProperties();

    propertiesVerified = properties.every((property) => {
      const propertyVerified = this.verifyProperty(property, properties, superTypeProperties);

      if (propertyVerified) {
        return true;
      }
    });

    return propertiesVerified;
  }

  verifyPropertyType(propertyType) {
    let propertyTypeVerified = false;

    if (propertyType === objectType) {
      propertyTypeVerified = true;
    } else {
      const propertyTypeString = propertyType.getString(); ///

      this.fileContext.trace(`Verifying the '${propertyTypeString}' property type...`);

      const propertyTypeName = propertyType.getName(),
            propertyTypePresent = this.fileContext.isTypePresentByTypeName(propertyTypeName);

      if (!propertyTypePresent) {
        const propertyTypeString = propertyType.getString();

        this.fileContext.debug(`The '${propertyTypeString}' property type is not present.`);
      } else {
        propertyTypeVerified = true;
      }

      if (propertyTypeVerified) {
        this.fileContext.debug(`...verified the '${propertyTypeString}' property type.`);
      }
    }

    return propertyTypeVerified;
  }

  static name = "ComplexTypeDeclaration";

  static fromComplexTypeDeclarationNode(complexTypeDeclarationNode, fileContext) {
    const { Type } = dom,
          type = Type.fromComplexTypeDeclarationNode(complexTypeDeclarationNode, fileContext),
          complexTypeDeclaration = new ComplexTypeDeclaration(fileContext, type);

    return complexTypeDeclaration;
  }
});
