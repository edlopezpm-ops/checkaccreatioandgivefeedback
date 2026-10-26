# Auditoría antihacking y snapshots completos de accreatio

Publicación autorizada por Ed Lopez el 26 de octubre de 2026 para revisión y feedback.

La auditoría corresponde exclusivamente al snapshot local **0dcafbc426b01faea621d13121e36a54099b283a**, con sus archivos locales sin seguimiento. **FAIL**: 23 PASS, 3 FAIL y 4 UNKNOWN; cumplimiento demostrado 75 % y cobertura de decisión 85,48 %. No se observó adaptación indebida a tests ni manipulación del evaluador; autoría e intención no determinadas.

El main remoto **fd1838f4927bd026d0f6449c7e1c1488874c5f43**, observado al publicar, es posterior y diferente: se aporta completo por separado **sin atribuirle el resultado de esa auditoría**. Su auditoría nueva no se ejecutó. El dossier público mínimo anterior y sus recibos conservan su fecha y alcance.

## Descargas y lectura

- [Informe íntegro](audit/REPORT.md), [matriz](audit/MATRIX.json), [score](audit/SCORECARD.json), [hallazgos](audit/FINDINGS.json) y [origen de evidencias](audit/EVIDENCE_MANIFEST.json).
- [Snapshot completo auditado](accreatio-full-audited-0dcafbc-2026-10-26.zip): 712 archivos, 48235037 bytes originales, incluidos los cuatro grupos locales sin seguimiento. Sus bytes se verificaron contra el manifiesto original.
- [Snapshot completo de main actual](accreatio-full-main-fd1838f-2026-10-26.zip): 613 archivos de Git, verificados contra los blobs del commit; [manifiesto](CURRENT-MAIN-MANIFEST.json).
- [Prompt para una revisión nueva](REVIEW_PROMPT.md) y [procedencia](PROVENANCE.json).

La auditoría conserva los 491 tests pasados, el verify inicialmente fallido por Lighthouse 76, la repetición 86, controles negativos y los UNKNOWN externos. El gate de dependencias también bloquea CI en el snapshot auditado. No sustituir estos estados por recibos de otra revisión.

## Alcance de la entrega

Los ZIP contienen fuente, frontend, Functions/backend, SQL/migraciones, tests, scripts, configuración de referencia, lockfile, documentación, activos/licencias y custodia histórica. El escritorio está retirado, nunca fue publicado y no es una entrega soportada. No se ejecuta ni publica un instalador.

Se excluyen .git, node_modules, .wrangler, caches, bases runtime, configuraciones reales y credenciales. El único archivo de variables incluido es .dev.vars.example. Los ZIP de ejemplos y diseño ya presentes en la fuente se conservan. La evidencia incluye datos sintéticos explícitos, no exportaciones de cuentas reales. Las rutas locales del auditor se conservan como procedencia y algunos repro requieren ajustar esas rutas o reconstruir el layout original.

Para reproducir el snapshot auditado, extraer su ZIP en audit/snapshot, instalar sus dependencias fijadas y usar los repro/recibos indicados en REPORT. Las pruebas deben correr en una copia local o sandbox; no escribir en producción. No confundir la fuente completa con un backup del estado de D1, credenciales, proveedores o despliegue.

La publicación expresa de estos snapshots amplía para esta entrega el alcance histórico limitado a extractos. **No cambia la licencia privada de accreatio ni concede redistribución u otros derechos**; se conserva LICENSE en ambos ZIP y [NOTICE del dossier](../../../NOTICE.md).

[Descargar informe y evidencia completos en un ZIP](accreatio-audit-evidence-2026-10-26.zip) (120 archivos; SHA-256 en PROVENANCE.json). [Revisión previa a publicación](PUBLICATION-QA.json) · [Clasificación del scanner](PUBLICATION-SCAN.json).
