const evento = {
  /* =========================
     DATOS GENERALES
  ========================= */
  nombre: "Sofia",

  /* =========================
     FECHA DEL EVENTO
  ========================= */
  fecha: {
    texto: "26 de Diciembre de 2026",
    iso: "2026-12-26T16:00:00",
  },

  /* =========================
     MÚSICA
  ========================= */
  musica: {
    archivo: "assets/music/Zoé - Luna (Unplugged).mp3",
  },

  /* =========================
     PADRES
  ========================= */
  padres:  null, /* {
    titulo: "Con el amor de mis padres",
    nombres: ["", "&", ""],
  }, */

  /* =========================
     PADRINOS
  ========================= */
  padrinos: {
    titulo: "Con el Cariño de mis padrinos",
    nombres: ["Omar Ramírez Campos", "&", "Nallely Tagal Gómez"],
  },

  /* =========================
     HASHTAG
  ========================= */
  hashtag: "#SofiFest2026",

  /* =========================
   REGALOS
========================= */
  regalos: {
    titulo: "Sugerencia de Regalos",
    mensaje:
      "Tu presencia hará de este día algo muy especial, siendo para mi el mejor regalo. Pero si deseas tener un detalle y no sabes qué regalarme...",

    /* Lluvia de sobres */
    lluviaSobres: {
      activo: true,
      titulo: "Lluvia de Sobres",
      descripcion:
        "La lluvia de sobres es una tradición especial que permite a los invitados regalar a la festejada una muestra de cariño en forma de un incentivo económico, entregado con amor y discreción en un sobre el día del evento.",
    },

    /* Regalos físicos */
    regalosFisicos: {
      activo: false,
      titulo: "Sugerencias de Regalo",
      opciones: [
        "Perfumes",
        "Accesorios",
        "Ropa",
        "Bolsos",
        "Un detalle especial",
      ],
    },

    /* Mesas de regalos */
    mesas: {
      activo: false,
      titulo: "Mesa de Regalos",
      tiendas: [
        {
          nombre: "Liverpool",
          enlace: "",
        },
        {
          nombre: "Amazon",
          enlace: "",
        },
      ],
    },
  },

  /* =========================
     UBICACIÓN
  ========================= */
  ubicaciones: [
    {
      tipo: "Recepción",
      nombre: "Sofia´s Party",
      mapa: "https://maps.app.goo.gl/Fo8MFygpdRQcavcv5",
    },
    {
      tipo: "Ceremonia religiosa",
      nombre: "Parroquia de la Divina Providencia",
      mapa: "https://maps.app.goo.gl/dvecw18MKS4UMDj88",
    },
  ],

  /* =========================
     WHATSAPP
  ========================= */
  whatsapp: {
    telefono: "52 5621973586",
    mensajeConfirmacion:
      "🎉 ¡Hola! Somos la familia [aqui coloca el nombre] y con mucho gusto queremos confirmar nuestra asistencia a los XV años de {evento} 🎈👑🎊",
  },

  /* =========================
     VIDEO (opcional)
  ========================= */
  video: null,

  /* =========================
     ITINERARIO
  ========================= */
  itinerario: [
    {
      hora: "06:15 pm",
      nombre: "Misa Puntual",
      icono: "assets/img/icons/misa.gif",
      lado: "left",
    },
    {
      hora: "08:00  pm",
      nombre: "Recepción",
      icono: "assets/img/icons/recepcion.gif",
      lado: "right",
    },
    {
      hora: "09:30  pm",
      nombre: "Cena",
      icono: "assets/img/icons/cena.gif",
      lado: "left",
    },
    {
      hora: "10:30 pm",
      nombre: "Vals",
      icono: "assets/img/icons/vals.gif",
      lado: "right",
    },
    {
      hora: "01:30 am",
      nombre: "Pista de Baile",
      icono: "assets/img/icons/baile.gif",
      lado: "left",
    },
    {
      hora: "03:00 am",
      nombre: "Fin",
      icono: "assets/img/icons/salida.gif",
      lado: "right",
    },
  ],

  /* =========================
     CÓDIGO DE VESTIMENTA
  ========================= */
  vestimenta: {
    titulo: "Código de Vestimenta",
    codigo: "Semiformal · Casual Elegante",
    descripcion:
      "Queremos que disfrutes y te sientas cómodo durante la celebración. Te sugerimos un estilo elegante y relajado para esta ocasión especial.",
    colorReservado: "Azúl Celeste",
  },

  /* =========================
      Politicas del evento
  ========================= */
  politicas: {
    titulo: "Políticas del evento",
    reglas: [
      "Llegar puntuales",
      "Queda estrictamente prohibido fumar en el interior del evento",
    ],
  },

  /* =========================
     FOOTER
  ========================= */
  footer: "SofiFest2026",
};
