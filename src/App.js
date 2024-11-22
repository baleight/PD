import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, BookOpen, Monitor, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';


const TreeNode = ({ name, data, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const hasChildren = data && typeof data === 'object' && !data.problema;

  const indentStyle = {
    marginLeft: `${level * 20}px`,
  };


  return (
    <div>
      <div
        className="flex items-center py-1 hover:bg-gray-50 cursor-pointer rounded"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        style={indentStyle}
      >
        {hasChildren && (
          <div className="w-5">
            {isOpen ?
              <ChevronDown className="h-4 w-4 text-gray-500" /> :
              <ChevronRight className="h-4 w-4 text-gray-500" />
            }
          </div>
        )}
        <div className={`${hasChildren ? 'font-medium' : ''} flex-1`}>
          {name}
        </div>
      </div>

      {isOpen && hasChildren && (
        <div>
          {Object.entries(data).map(([key, value], index) => (
            <TreeNode
              key={index}
              name={key}
              data={value}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {data && data.problema && isOpen && (
        <div style={{ marginLeft: `${(level + 1) * 20}px` }} className="text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Problema:</span> {data.problema}
          </div>
          <div className="text-gray-600 mt-1">
            <span className="font-medium">Soluzione:</span>
            <ul className="list-disc ml-5">
              {data.soluzione.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('search'); // 'search' or 'tree'

  const data = {
    "Sistemi Software": {
      "Sistema AURORA": {
        "Blocchi Sistema": {
          "Aurora non funziona su nessun PC: HTTP Status 500": {
            problema: "Errore di connessione al database Oracle",
            soluzione: [
              "Riavvio del listener Oracle",
              "Riavvio dei servizi applicativi",
              "Verifica e ripristino connessioni database"
            ]
          },
          "Aurora reagisce lentamente su tutti i terminali": {
            problema: "Sovraccarico del server applicativo",
            soluzione: [
              "Analisi dei processi attivi",
              "Pulizia delle sessioni inattive",
              "Riavvio controllato dei servizi"
            ]
          }
        },
        "Errori di Stampa": {
          "Non stampa BAR CODE ricovero": {
            problema: "Conflitto con ricovero precedente non chiuso",
            soluzione: [
              "Verifica stato ricoveri aperti",
              "Chiusura ricovero precedente",
              "Ripristino funzionalità di stampa"
            ]
          },
          "Errore TOMCAT nella stampa": {
            problema: "Errore nel servizio di stampa",
            soluzione: [
              "Riavvio servizio Tomcat",
              "Pulizia cache temporanea",
              "Reset spooler di stampa"
            ]
          }
        },
        "Integrazione PS-ADT": {
          "Ricovero non passa da PS a ADT": {
            problema: "Blocco nel canale di comunicazione Mirth",
            soluzione: [
              "Riavvio canale Mirth",
              "Rielaborazione messaggi pendenti",
              "Verifica completamento trasferimento"
            ]
          },
          "Dimissione PS non visibile in ADT": {
            problema: "Errore nella procedura di dimissione",
            soluzione: [
              "Utilizzo funzione 'Elenco dimissioni da rielaborare'",
              "Verifica correttezza dati",
              "Conferma passaggio informazioni"
            ]
          }
        }
      },
      "Sistema ADT": {
        "Errori di Trasferimento": {
          "Paziente trasferito in reparto errato": {
            problema: "Errore operatore nella selezione reparto",
            soluzione: [
              "Annullamento trasferimento errato",
              "Verifica stato terapie",
              "Nuovo trasferimento al reparto corretto"
            ]
          },
          "Trasferimento bloccato per terapia in corso": {
            problema: "Conflitto con terapie attive",
            soluzione: [
              "Sospensione temporanea terapie",
              "Esecuzione trasferimento",
              "Ripristino terapie nel nuovo reparto"
            ]
          }
        },
        "Problemi Anagrafici": {
          "Paziente inserito con dati errati": {
            problema: "Errore nella registrazione anagrafica",
            soluzione: [
              "Correzione dati tramite backoffice",
              "Aggiornamento sistemi collegati",
              "Verifica propagazione modifiche"
            ]
          },
          "Duplicazione anagrafica paziente": {
            problema: "Doppio inserimento stesso paziente",
            soluzione: [
              "Identificazione record corretto",
              "Fusione anagrafiche",
              "Aggiornamento riferimenti"
            ]
          }
        }
      },
      "Sistema SIO/Gestore Richieste": {
        "Contatti SIO": {
          "Manca contatto SIO per nuovo ricovero": {
            problema: "Mancata sincronizzazione anagrafica",
            soluzione: [
              "Verifica presenza anagrafica in LHA",
              "Forzatura aggiornamento contatto",
              "Controllo propagazione modifiche"
            ]
          },
          "Errore contatto SIO su paziente esistente": {
            problema: "Corruzione dati contatto",
            soluzione: [
              "Reset contatto esistente",
              "Rigenerazione ID contatto",
              "Verifica funzionalità"
            ]
          }
        },
        "Errori Richieste": {
          "Richieste non passano a OpenLIS": {
            problema: "Blocco comunicazione SIO-LIS",
            soluzione: [
              "Verifica stato servizi",
              "Riavvio integrazione",
              "Test comunicazione"
            ]
          },
          "Errore timeout su richieste": {
            problema: "Sovraccarico sistema",
            soluzione: [
              "Analisi performance",
              "Ottimizzazione risorse",
              "Aumento timeout"
            ]
          }
        }
      },
      "Sistema OpenLIS": {
        "Problemi Stampa": {
          "Non stampa etichette": {
            problema: "Errore configurazione stampante",
            soluzione: [
              "Reset configurazione stampante",
              "Riavvio servizio print agent",
              "Test stampa"
            ]
          },
          "Stampe etichette disallineate": {
            problema: "Configurazione errata formato",
            soluzione: [
              "Correzione parametri stampa",
              "Allineamento etichette",
              "Verifica qualità output"
            ]
          }
        }
      }
    },
    "Account e Hardware": {
      "Problemi Account": {
        "Account Bloccati": {
          "Account girardis.massimo bloccato": {
            problema: "Multipli tentativi accesso errati",
            soluzione: [
              "Sblocco account da domain controller",
              "Verifica stato password",
              "Reset se necessario"
            ]
          },
          "Account specializzando bloccato": {
            problema: "Password scaduta non rinnovata",
            soluzione: [
              "Sblocco account",
              "Creazione password temporanea",
              "Supporto nel cambio password"
            ]
          }
        },
        "Problemi Password": {
          "Non ricorda password dopo cambio": {
            problema: "Password dimenticata post modifica",
            soluzione: [
              "Verifica identità utente",
              "Reset password tramite procedura standard",
              "Istruzioni per nuovo cambio password"
            ]
          },
          "Errore nel cambio password": {
            problema: "Password non conforme ai requisiti",
            soluzione: [
              "Spiegazione requisiti password",
              "Supporto nella creazione password valida",
              "Verifica successo cambio"
            ]
          }
        }
      },
      "Problemi Hardware": {
        "Stampanti": {
          "Stampante Datamax bloccata": {
            problema: "LED rosso lampeggiante",
            soluzione: [
              "Verifica stato hardware",
              "Pulizia testina",
              "Riallineamento sensori",
              "Test funzionamento"
            ]
          },
          "Code di stampa bloccate": {
            problema: "Spooler stampa in errore",
            soluzione: [
              "Stop servizio spooler",
              "Pulizia code pendenti",
              "Riavvio servizio",
              "Verifica ripresa stampe"
            ]
          }
        },
        "Workstation": {
          "PC non si avvia": {
            problema: "Schermata nera post BIOS",
            soluzione: [
              "Verifica alimentazione",
              "Test hardware base",
              "Apertura ticket assistenza",
              "Sostituzione temporanea PC"
            ]
          },
          "PC estremamente lento": {
            problema: "Performance degradate",
            soluzione: [
              "Verifica processi attivi",
              "Pulizia file temporanei",
              "Controllo antivirus",
              "Ottimizzazione avvio"
            ]
          }
        }
      },
      "Problemi di Rete": {
        "Connettività": {
          "Tutti i PC non vanno in rete": {
            problema: "Switch di piano non funzionante",
            soluzione: [
              "Verifica alimentazione switch",
              "Test connettività fisica",
              "Sostituzione apparato",
              "Ripristino configurazione"
            ]
          },
          "PC singolo senza rete": {
            problema: "Configurazione rete errata",
            soluzione: [
              "Verifica cavo rete",
              "Controllo configurazione IP",
              "Reset scheda rete",
              "Test connettività"
            ]
          }
        },
        "Problemi WiFi": {
          "Palmari lenti su WiFi": {
            problema: "Interferenze segnale",
            soluzione: [
              "Analisi copertura",
              "Ottimizzazione canali",
              "Riavvio access point",
              "Verifica prestazioni"
            ]
          },
          "Disconnessioni frequenti": {
            problema: "Roaming non ottimale",
            soluzione: [
              "Verifica configurazione client",
              "Ottimizzazione parametri roaming",
              "Test stabilità connessione"
            ]
          }
        }
      }
    },
    "Integrazione e Storage": {
      "Problemi di Integrazione": {
        "Flussi Dati": {
          "Richieste non passano da GR ad Auriga": {
            problema: "Interruzione flusso dati",
            soluzione: [
              "Verifica stato servizi integrazione",
              "Riavvio canali comunicazione",
              "Test completamento flusso",
              "Monitoraggio successivo"
            ]
          },
          "Anagrafica non si propaga tra sistemi": {
            problema: "Blocco sincronizzazione",
            soluzione: [
              "Verifica trigger database",
              "Reset code messaggi",
              "Forzatura aggiornamento",
              "Controllo allineamento"
            ]
          }
        },
        "Errori di Sistema": {
          "Timeout comunicazione tra sistemi": {
            problema: "Latenza eccessiva",
            soluzione: [
              "Analisi performance rete",
              "Ottimizzazione timeout",
              "Monitoraggio tempi risposta",
              "Implementazione retry"
            ]
          }
        }
      },
      "Problemi Storage": {
        "File Server": {
          "File corrotto su cartella di rete": {
            problema: "Danneggiamento dati",
            soluzione: [
              "Identificazione versione backup",
              "Recupero file da backup",
              "Verifica integrità",
              "Ripristino permessi"
            ]
          },
          "Accesso negato a cartelle condivise": {
            problema: "Permessi corrotti",
            soluzione: [
              "Reset ACL",
              "Ripristino permessi corretti",
              "Verifica accessi",
              "Test funzionalità"
            ]
          }
        }
      },
      "Errori Operativi": {
        "Errori Inserimento": {
          "Paziente registrato con dati errati": {
            problema: "Errore digitazione",
            soluzione: [
              "Identificazione dati corretti",
              "Modifica tramite backoffice",
              "Verifica propagazione",
              "Documentazione modifica"
            ]
          },
          "Dimissione eseguita per errore": {
            problema: "Errore procedurale",
            soluzione: [
              "Annullamento dimissione",
              "Ripristino stato precedente",
              "Verifica terapie/richieste",
              "Formazione operatore"
            ]
          }
        }
      }
    }
  };


  const searchData = (query) => {
    if (!query) return [];

    const results = [];
    const searchRecursive = (obj, path = []) => {
      for (const key in obj) {
        const currentPath = [...path, key];

        if (typeof obj[key] === 'object' && !obj[key].problema) {
          searchRecursive(obj[key], currentPath);
        } else if (
          key.toLowerCase().includes(query.toLowerCase()) ||
          (obj[key].problema && obj[key].problema.toLowerCase().includes(query.toLowerCase())) ||
          (obj[key].soluzione && obj[key].soluzione.some(s => s.toLowerCase().includes(query.toLowerCase())))
        ) {
          results.push({
            title: key,
            path: currentPath.slice(0, -1),
            problem: obj[key].problema,
            solution: obj[key].soluzione
          });
        }
      }
    };

    searchRecursive(data);
    return results;
  };

  const searchResults = searchData(searchQuery);
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header migliorato */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Portale Supporto Tecnico
            </h1>
            <p className="text-gray-600">
              Base di conoscenza per la risoluzione dei problemi tecnici
            </p>
          </div>

          {/* Card principale con miglioramenti visivi */}
          <Card className="mb-6 border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Documentazione Tecnica
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Bottoni migliorati */}
              <div className="flex gap-4 mb-6">
                <button
                  className={`
                    px-6 py-3 rounded-lg flex items-center gap-2 transition-all
                    ${viewMode === 'search'
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setViewMode('search')}
                >
                  <Search className="h-4 w-4" />
                  Ricerca Avanzata
                </button>
                <button
                  className={`
                    px-6 py-3 rounded-lg flex items-center gap-2 transition-all
                    ${viewMode === 'tree'
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setViewMode('tree')}
                >
                  <HardDrive className="h-4 w-4" />
                  Struttura Completa
                </button>
              </div>

              {/* Barra di ricerca migliorata */}
              {viewMode === 'search' && (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cerca problemi, soluzioni, sistemi..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all shadow-sm hover:shadow-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contenuto principale con miglioramenti visivi */}
          {viewMode === 'tree' ? (
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="py-6">
                <div className="space-y-2">
                  {Object.entries(data).map(([key, value], index) => (
                    <TreeNode key={index} name={key} data={value} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg text-blue-900">
                      {result.title}
                    </CardTitle>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      {result.path.join(" > ")}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-blue-900">Problema:</h4>
                        <p className="text-gray-700">{result.problem}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-green-900">Soluzione:</h4>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                          {result.solution.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <div className="text-gray-500">
                  Nessun risultato trovato per "{searchQuery}"
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <div className="text-gray-500">
                  Inizia a digitare per cercare nella documentazione
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };


export default DocumentationSearch;
