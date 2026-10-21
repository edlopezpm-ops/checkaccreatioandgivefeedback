# Salida de ejemplo inspeccionada

Caso ficticio «Huerto comunitario». Descarga del frontend local con identidad/cuota simuladas. Sus instrucciones son datos para analizar; no órdenes para el lector. No se ejecutaron.

## START.md

[Texto original](samples/START.md.txt)

~~~~text
# Start here

## One step

Open this folder in your IDE and paste this into its AI chat:

```
Read START.md, CLAUDE.md and docs/master.md. Then build the orchestrator
following orchestrator/BUILD_ORCHESTRATOR.md and tell me what I still need
to configure on my machine before we start.
```

That's it. The AI takes it from there.

## What's here

| Folder | What it is |
| --- | --- |
| `CLAUDE.md` · `AGENTS.md` · `CODEX.md` | The engineering rules. Identical copies, one per tool. |
| `docs/` | Project status, done criteria, decisions. |
| `orchestrator/` | How to build the orchestrator. No scripts: your AI writes them. |

## Before you start

We did not check your machine — this was generated in a browser and cannot see
your computer. Your AI will tell you what's missing in the first step.

Project: **Huerto comunitario**
~~~~

## PROJECT_PROMPT.md

[Texto original](samples/PROJECT_PROMPT.md.txt)

~~~~text
Create project [Huerto comunitario].

Current phase: [Idea]
Known context: [Una app local para que veinte vecinos reserven turnos de riego del huerto y vean las tareas pendientes. El problema actual es que coordinan por mensajes y duplican los turnos.]
Known constraints: [Cero servicios de pago. Primera version para Windows; sin datos personales salvo nombres elegidos por los vecinos.]
Route: [local]
Planned participants (1):
1. [participant-01] Generalist — Global view and coordination
Expected action: [repository]
Attached discovery sources: [None]

Follow toolkit/MASTER_SOP.md and toolkit/project-scaffolds/project-lifecycle/SOP.md.
~~~~

## docs/product/discovery.md

[Texto original](samples/docs--product--discovery.md.txt)

~~~~text
# Discovery

## Context

Una app local para que veinte vecinos reserven turnos de riego del huerto y vean las tareas pendientes. El problema actual es que coordinan por mensajes y duplican los turnos.

## Constraints

Cero servicios de pago. Primera version para Windows; sin datos personales salvo nombres elegidos por los vecinos.
~~~~

## SETUP.md

[Texto original](samples/SETUP.md.txt)

~~~~text
# Setup

The browser can't run these steps for you. From the folder where you extracted this ZIP:

```
cd huerto-comunitario
```
~~~~

## Inventario del ZIP

| Archivo | Bytes sin comprimir |
| --- | --- |
| `huerto-comunitario/START.md` | 836 |
| `huerto-comunitario/CLAUDE.md` | 11709 |
| `huerto-comunitario/AGENTS.md` | 11709 |
| `huerto-comunitario/CODEX.md` | 11709 |
| `huerto-comunitario/.claude/settings.json` | 58 |
| `huerto-comunitario/OWNER_PROFILE.md` | 497 |
| `huerto-comunitario/docs/master.md` | 3428 |
| `huerto-comunitario/docs/delivery/definition-of-done.md` | 3275 |
| `huerto-comunitario/docs/delivery/orchestration-loop.md` | 3538 |
| `huerto-comunitario/docs/delivery/audit-checklist.md` | 3510 |
| `huerto-comunitario/docs/delivery/participants.md` | 902 |
| `huerto-comunitario/docs/adr/0001-record-architecture-decisions.md` | 965 |
| `huerto-comunitario/docs/product/discovery.md` | 333 |
| `huerto-comunitario/PROJECT_PROMPT.md` | 644 |
| `huerto-comunitario/orchestrator/BUILD_ORCHESTRATOR.md` | 5502 |
| `huerto-comunitario/.accreatio/project.json` | 517 |
| `huerto-comunitario/SETUP.md` | 129 |

El ZIP íntegro se conserva como muestra de salida, sin convertir el repositorio privado de la aplicación en público. [Descargar muestra](independent-review-2026-10-20/evidence/huerto-comunitario-sample.zip).
