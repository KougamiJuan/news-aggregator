const PROXY_CONFIG = [
  {
    context: ['/colombia.xml', '/mundo.xml', '/mundo_latinoamerica.xml', '/mundo_eeuu-y-canada.xml', '/mundo_asia.xml'],
    target: 'https://www.eltiempo.com/rss',
    secure: false,
    changeOrigin: true
  },
  {
    context: ['/economia', '/negocios', '/mis-finanzas', '/innovacion', '/tendencias'],
    target: 'https://www.portafolio.co/rss',
    secure: false,
    changeOrigin: true
  },
  {
    context: ['/computadoras/feed/', '/videojuego/feed/', '/fotografia/feed/', '/sociales/feed/', '/celular/feed/'],
    target: 'https://es.digitaltrends.com',
    secure: false,
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;