module.exports = function(app) {
  app.dataSources.db.automigrate('Livro', function(err) {
    if (err) throw err;

    app.models.Livro.create([{
      titulo: 'Linguagem de Programação',
      autor: 'Erick Sanches',
      editora: 'DERL',
      ano: '2015',
      localizacao: 'Prateleira A'
    }, {
      titulo: 'Análise de Sistemas',
      autor: 'William Douglas',
      editora: 'SSl Tm',
      ano: '1997',
      localizacao: 'Prateleira B'
    }, {
      titulo: 'GUIA DE STARTUPS',
      autor: 'Roverto Augusto',
      editora: 'Saraiva',
      ano: '2016',
      localizacao: 'Prateleira D'
    },
      {
      titulo: 'Engenharia de Software',
      autor: 'Fernando Silva',
      editora: 'Concorde',
      ano: '2009',
      localizacao: 'Prateleira C'
    },

    ], function(err, livros) {
      if (err) throw err;
      console.log('Models created: \n', livros);
    });
  });
};
