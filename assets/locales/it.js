export default (context) => {
  return new Promise(function(resolve) {
    resolve({
      app: {
        title: 'GTD TodoList',
        description: 'My GTD application',
        workspace: 'workspace',
        languages: 'Lingue',
        all: 'Tutti',
        edit: 'Modifica',
        remove: 'Elimina',
        cancel: 'Annulla',
        confirm: 'Conferma',
        save: 'Salva'
      },
      todos: {
        fields: {
          title: 'Titolo',
          date: 'Scadenza',
          state: 'Stato',
          description: 'Descrizione'
        },
        states: {
          inbox: 'Raccolta',
          next: 'Prossime azioni',
          calendar: 'Calendario',
          maybe: 'Forse',
          archive: 'Archivio'
        },
        edit: 'Modifica todo',
        sectionName: 'Todo',
        state: 'Stato',
        add: 'Crea nuovo todo',
        date: 'Data',
        remove: 'Elimina Todo',
        removeConfirm: 'Sei sicuro di voler eliminare il todo {name}?',
        removeDone: 'Todo eliminato con successo!',
        modifyDone: 'Todo modificato con successo!'
      }
    })
  })
}
