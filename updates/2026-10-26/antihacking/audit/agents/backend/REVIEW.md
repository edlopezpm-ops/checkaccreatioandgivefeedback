# Revisión de backend — accreatio

Snapshot: `0dcafbc426b01faea621d13121e36a54099b283a`, copia congelada por root. Se revisaron semánticamente todos los archivos de `functions/`, `workers/`, ambas cadenas SQL y los contratos compartidos de cuenta/Collect. El listado exacto queda en `reviewed-files.json`; tests grandes restantes se distinguen en `review-coverage.json`.

Se ejecutaron 19 verificaciones independientes de contratos con SQL del producto sobre SQLite en archivo y reapertura de conexión: cuotas/reintento, continuación necesaria, datos/borrado, derechos sin Terms y durante suspensión, sesiones/logout, enlace explícito, ramas de OIDC, CAPTCHA, OTP/mail, Collect/campos/GPC/expiración/límites/retirada, admisión HTTP, publicación Blog y mantenimiento. Resultado: **19 PASS / 0 FAIL**. Los providers y transportes son sintéticos locales; no acreditan OAuth personal, entrega de buzón, Access real, despliegue, estado D1 ni ejecución de cron alojado.

Tres controles negativos en subcopias desechables fueron **DETECTED 3 / SURVIVED 0 / NOT_COVERED 0 / EQUIVALENT 0 / INVALID 0 / TIMEOUT 0**: omitir borrado de retirada, permitir sexta autorización y omitir la comprobación final de datos propios. Las tres copias fueron restauradas y comparadas por SHA-256 con el baseline. La suite base fue ampliada posteriormente de 16 a 19 verificaciones sin cambiar los controles negativos; los JSON de cada mutación conservan sus 16 verificaciones originales.

**B-W01, WEAK_TEST CONFIRMED P2:** el test de carrera de revocación en `tests/accountRollback.test.ts:318-354` rechaza data/delete antes de ejecutar el hook que simula la revocación, porque no proporciona proof ligado a la acción. La reproducción mide hook=0 para esos dos casos y hook=1 al suministrar la precondición legítima; authorize sí se ejecuta. Esto debilita esa evidencia específica, no demuestra fallo de autorización. Nuestras comprobaciones nuevas sí alcanzan la carrera durante descifrado y detectan omitir su recheck.

Se refutó la alternativa de que un rerender corrija automáticamente el aviso de CookiePreferences: `choose(false)` conserva `status` cuando la retirada retorna true. Es un aviso visual obsoleto; ninguna lectura de ese código justifica afirmar recopilación indebida y la retirada SQL independiente sí elimina los registros. El hallazgo principal/UI y su reproducción quedan a cargo de root/contracts.

No se observó simulación activa del backend donde el contrato exige trabajo real, adaptación indebida al evaluador ni intención atribuible. Los stubs de pruebas/provider están explícitamente separados. `tests/helpers/accountHarness.ts` puede completar el contexto de exportación para pruebas SQL, pero documenta el alcance; los tests específicos HTTP de contexto lo deshabilitan y comprueban su ausencia. No se califica ese helper como manipulación.

Comandos reproducibles desde el checkout:

- `node --import tsx .local/logs/antihacking-20261026-full/agents/backend/repro-backend.mts`
- `node .local/logs/antihacking-20261026-full/agents/backend/mutate-backend.mjs`
- `node --import tsx .local/logs/antihacking-20261026-full/agents/backend/repro-weak-rollback.mts`

La primera corrida independiente produjo 13/14 PASS porque la nueva fixture intentaba insertar directamente una transacción rights que infringía su trigger de creación. Se preservó como `independent-results-initial-invalid-fixture.json`; se descartó como defecto del producto y se reemplazó por la cadena real create→claim→complete. La corrida de 19/19 usa esa cadena. No se reparó el producto ni se escribió/desplegó en producción.

Actualización de cobertura: se completó la lectura semántica de los 26 tests/helpers backend asignados y de scripts/account-functional-smoke.mjs e identity-functional-smoke.mjs, incluidos fixtures/transporte, assertions, captura de errores y cierre. Sus sustituciones de proveedor y CAPTCHA quedan explícitas y fuera del código productivo. Sólo el cliente collection.ts permanece muestreado por este agente y pertenece a root/evaluation. **B-W02 WEAK_TEST CONFIRMED P3:** accountOidcStore.test.ts:492 puede no alterar el último byte si ya es ff y produce un fallo espurio frente al producto correcto. La reproducción determinista está en weak-tamper-results.json; usa también protectEmail real con el IV legal encontrado, confirma ciphertext idéntico y demuestra que cambiar efectivamente ff→fe sí se rechaza. No implica defecto de cifrado. El resto de estas suites no mostró adaptación indebida al evaluador.

Reproducción adicional: `node --import tsx .local/logs/antihacking-20261026-full/agents/backend/repro-weak-tamper.mts`.
