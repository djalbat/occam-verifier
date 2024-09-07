"use strict";

import Judgement from "../judgement";
import verifyFrame from "../verify/frame";
import frameMetaType from "../metaType/frame";
import JudgementAssignment from "../assignment/judgement";

import { first } from "../utilities/array";
import { nodeQuery } from "../utilities/query";

const frameNodeQuery = nodeQuery("/judgement/frame!"),
      metavariableNodeQuery = nodeQuery("/judgement/metavariable!");

export default function verifyJudgement(judgementNode, assignments, derived, localContext) {
  let judgementVerified;

  const judgementString = localContext.nodeAsString(judgementNode);

  localContext.trace(`Verifying the '${judgementString}' judgement...`, judgementNode);

  const verifyJudgementFunctions = [
    verifyDerivedJudgement,
    verifyStatedJudgement
  ];

  judgementVerified = verifyJudgementFunctions.some((verifyJudgementFunction) => {
    const judgementVerified = verifyJudgementFunction(judgementNode, assignments, derived, localContext);

    if (judgementVerified) {
      return true;
    }
  });

  if (judgementVerified) {
    localContext.debug(`...verified the '${judgementString}' judgement.`, judgementNode);
  }

  return judgementVerified;
}

function verifyDerivedJudgement(judgementNode, assignments, derived, localContext) {
  let derivedJudgementVerified = false;

  if (derived) {
    const judgementString = localContext.nodeAsString(judgementNode);

    localContext.trace(`Verifying the '${judgementString}' derived judgement...`, judgementNode);

    const metavariableNode = metavariableNodeQuery(judgementNode),
          metavariableVerified = verifyMetavariable(metavariableNode, localContext);

    if (metavariableVerified) {
      const judgement = localContext.findJudgementByMetavariableNode(metavariableNode);

      if (judgement !== null) {
        const frames = [],
              frameNode = frameNodeQuery(judgementNode),
              frameVerified = verifyFrame(frameNode, frames, assignments, derived, localContext);

        if (frameVerified) {
          const firstFrame = first(frames),
                frame = firstFrame, ///
                frameSingular = frame.isSingular();

          if (frameSingular) {
            const declaration = frame.getDeclaration(),
                  metavariableNode = declaration.getMetavariableNode(),
                  metaLemma = localContext.findMetaLemmaByMetavariableNode(metavariableNode),
                  metatheorem = localContext.findMetatheoremByMetavariableNode(metavariableNode),
                  metaLemmaMetatheorem = (metaLemma || metatheorem);  ///

            if (metaLemmaMetatheorem !== null) {
              const declarationMatchesMetaLemmaMetatheorem = declaration.matchMetaLemmaOrMetaTheorem(metaLemmaMetatheorem),
                    judgementMatchesMetaLemmaMetatheorem = judgement.matchMetaLemmaOrMetaTheorem(metaLemmaMetatheorem);

              derivedJudgementVerified = (declarationMatchesMetaLemmaMetatheorem && judgementMatchesMetaLemmaMetatheorem);
            } else {
              const metavariableString = localContext.nodeAsString(metavariableNode);

              localContext.debug(`There are no meta-lemmas or metatheorems corresponding to the '${metavariableString}' metavariable.`, judgementNode);
            }
          } else {
            const frameString = localContext.nodeAsString(frameNode);

            localContext.debug(`The '${frameString}' is not singular.`, judgementNode);
          }
        }
      } else {
        const metavariableString = localContext.nodeAsString(metavariableNode);

        localContext.debug(`There is no judgement present for the '${metavariableString}' metavariable.`, judgementNode);
      }
    }

    if (derivedJudgementVerified) {
      localContext.debug(`...verified the '${judgementString}' derived judgement.`, judgementNode);
    }
  }

  return derivedJudgementVerified;
}

function verifyStatedJudgement(judgementNode, assignments, derived, localContext) {
  let statedJudgementVerified = false;

  if (!derived) {
    const judgementString = localContext.nodeAsString(judgementNode);

    localContext.trace(`Verifying the '${judgementString}' stated judgement...`, judgementNode);

    const metavariableNode = metavariableNodeQuery(judgementNode),
          metavariableVerified = verifyMetavariable(metavariableNode, localContext);

    if (metavariableVerified) {
      const frames = [],
            frameNode = frameNodeQuery(judgementNode),
            frameVerified = verifyFrame(frameNode, frames, assignments, derived, localContext);

      if (frameVerified) {
        const firstFrame = first(frames),
              frame = firstFrame, ///
              judgement = Judgement.fromJudgementNodeFrameAndMetavariableNode(judgementNode, frame, metavariableNode),
              judgementAssignment = JudgementAssignment.fromJudgement(judgement),
              assignment = judgementAssignment;

        assignments.push(assignment);

        statedJudgementVerified = true;
      }
    }

    if (statedJudgementVerified) {
      localContext.debug(`...verified the '${judgementString}' stated judgement.`, judgementNode);
    }
  }

  return statedJudgementVerified;
}

function verifyMetavariable(metavariableNode, localContext) {
  let metavariableVerified = false;

  const metavariableString = localContext.nodeAsString(metavariableNode);

  localContext.trace(`Verifying the '${metavariableString}' metavariable...`, metavariableNode);

  const metavariable = localContext.findMetavariableByMetavariableNode(metavariableNode);

  if (metavariable !== null) {
    const metaType = metavariable.getMetaType();

    if (metaType === frameMetaType) {
      metavariableVerified = true;
    } else {
      const frameMetaTypeName = frameMetaType.getName(),
            metaTypeString = metaType.asString();

      localContext.debug(`The '${metavariableString}' metavariable's meta-type is '${metaTypeString}' when it should be '${frameMetaTypeName}'.`, metavariableNode);
    }
  } else {
    localContext.debug(`The '${metavariableString}' metavariable is not present'.`, metavariableNode);
  }

  if (metavariableVerified) {
    localContext.debug(`...verified the '${metavariableString}' metavariable.`, metavariableNode);
  }

  return metavariableVerified;
}