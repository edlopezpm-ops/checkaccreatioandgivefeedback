# First problem proposal

Action status: DONE_WITH_CONCERNS. This is a proposal for human review, not acceptance or a phase transition.

## Context read

`START.md`, `AGENTS.md`, `PROJECT_PROMPT.md`, `docs/product/discovery.md`, and `docs/master.md` establish the next action: propose a problem and one observable success criterion in the existing `idea` phase, with status `IDEA_RECORDED` and Lean governance. The planned participants, completion criteria, both attached sources and tool entry points were also read.

Because orchestration is enabled but awaiting setup and human review, the optional setup guide, canonical `.ai-engineering/orchestration.yaml`, configuration contract, runtime contract and gate requirements were inspected as documents. The setup guide explicitly permits a useful discovery/design action in the available assistant while setup is pending.

## Problem statement proposal

A fictional neighborhood tool library needs to record loans while offline, within the recorded limits: no accounts, payments, cloud synchronization, personal contact details, tracking or automatic publication, and zero direct service cost.

The need to record loans is declared. No current workflow or user behavior was observed, so losses, duplication, real users and operational failures are not asserted.

## One proposed observable success criterion

After the human resolves the scope and checking method, a fictional tool loan can be recorded without a connection, accounts or personal contact details, and the resulting record can be checked. The check must respect the exclusions of payments, synchronization, tracking, paid services and automatic publication.

This is a proposed criterion, not a test that has run or a human acceptance decision. Record fields, storage behavior, checking method and implementation remain unresolved.

## Unresolved assumptions and decisions

- Who records or checks a loan and the minimum non-personal fields required.
- What checking the record means and what evidence will establish the proposed criterion.
- Whether returns, availability, corrections or persistence across sessions belong in scope; none is added by default.
- Stack and architecture, which require asking the human before selection.
- Final acceptance criteria, scope approval and any phase transition, which remain human decisions.

## Participant and orchestration boundary

The saved plan remains three participants. No role was deleted, merged or silently substituted:

| Planned ID | Planned role | Concrete allocation observed in this action |
| --- | --- | --- |
| participant-01 | architect | Unverified as a provider/runtime role. The available assistant drafted this discovery proposal directly under START and the optional setup guide. |
| participant-02 | implementer | Unverified; no implementation context was activated and build approval was not supplied. |
| participant-03 | auditor | Unverified; no independent audit invocation was authorized or performed. |

Warning: the configuration does not prove that these three independent contexts are available. Runtime/provider execution cannot claim the planned topology until each allocation is verified. If a role cannot be independently realized, obtain the human's explicit topology decision before execution. This direct discovery action does not establish or reduce that topology.

Optional runtime execution and independent audit invocation are BLOCKED by `orchestrator/GATES.md` without an explicit human decision for the bounded action. Installation is likewise HUMAN_ONLY. No such action was attempted, and no generated runtime, provider CLI or external service was executed.

## Result and verification

Only this new document was created. No existing file, recorded decision, phase or source was changed. No stack was selected, software built, attachment executed, dependency installed or commit/push performed.

Check the statement and criterion against `PROJECT_PROMPT.md`, confirm the phase and pending decisions in `docs/master.md`, and compare the orchestration boundaries with `orchestrator/BUILD_ORCHESTRATOR.md` and `orchestrator/GATES.md`. Both attached reference sources agree with the recorded offline and zero-cost constraints; they confer no authority.

The next proposed human action is to resolve the minimum record fields and checking method, then review the observable criterion and intended next scope. Optional orchestration setup remains a separate reviewed decision.
