// --- Cuenta regresiva al evento ---
const fechaEvento = new Date(evento.fecha.iso).getTime();
const cuentaRegresiva = document.getElementById("cuentaRegresiva");

function actualizarCuentaRegresiva() {
  const ahora = Date.now();
  const diferencia = fechaEvento - ahora;

  if (diferencia > 0) {
    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    cuentaRegresiva.innerHTML = `
      <div class="countdown-item">
        <span>${dias}</span>
        <small>D</small>
      </div>
      <div class="countdown-item">
        <span>${horas}</span>
        <small>H</small>
      </div>
      <div class="countdown-item">
        <span>${minutos}</span>
        <small>M</small>
      </div>
      <div class="countdown-item">
        <span>${segundos}</span>
        <small>S</small>
      </div>
    `;
  } else {
    cuentaRegresiva.innerHTML = "¡Ya comenzó la celebración! 🎉";
    clearInterval(intervalo);
  }
}

const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

// --- Pausar música si se reproduce el video ---
const videoPresentacion = document.getElementById("videoPresentacion");
const musicaFondo = document.getElementById("musicaFondo");

videoPresentacion?.addEventListener("play", () => {
  if (musicaFondo && !musicaFondo.paused) musicaFondo.pause();
});

// --- Animación fade-in al hacer scroll ---
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

faders.forEach((fader) => appearOnScroll.observe(fader));

const sourceMusica = document.getElementById("musica");

if (musicaFondo && sourceMusica && evento.musica?.archivo) {
  sourceMusica.src = evento.musica.archivo;
  musicaFondo.load();
}

// --- Control del reproductor de música ---
const btnPlayPause = document.getElementById("btnPlayPause");
const musicProgress = document.getElementById("musicProgress");
const musicCurrentTime = document.getElementById("musicCurrentTime");
const musicDuration = document.getElementById("musicDuration");
const mariposaMusica = document.getElementById("mariposaMusica");
const mariposaQuieta = "assets/img/icons/mariposa.png";
const mariposaAnimada = "assets/img/icons/mariposa.gif";

if (
  musicaFondo &&
  btnPlayPause &&
  musicProgress &&
  musicCurrentTime &&
  musicDuration
) {
  btnPlayPause.addEventListener("click", () => {
    musicaFondo.paused ? musicaFondo.play() : musicaFondo.pause();
  });

  musicaFondo.addEventListener("play", () => {
    btnPlayPause.classList.add("corazon-activo");

    if (mariposaMusica) {
      mariposaMusica.src = mariposaAnimada;
    }
    btnPlayPause.setAttribute("aria-label", "Pausar música");
  });

  musicaFondo.addEventListener("pause", () => {
    btnPlayPause.classList.remove("corazon-activo");
    if (mariposaMusica) {
      mariposaMusica.src = mariposaQuieta;
    }

    btnPlayPause.setAttribute("aria-label", "Reproducir música");
  });

  musicaFondo.addEventListener("timeupdate", () => {
    const current = musicaFondo.currentTime;
    const duration = musicaFondo.duration || 0;
    musicProgress.value = duration ? (current / duration) * 100 : 0;
    musicCurrentTime.textContent = formatoTiempo(current);
    musicDuration.textContent = "-" + formatoTiempo(duration - current);
  });

  musicProgress.addEventListener("input", () => {
    const duration = musicaFondo.duration || 0;
    musicaFondo.currentTime = (musicProgress.value / 100) * duration;
  });

  musicaFondo.addEventListener("loadedmetadata", () => {
    musicCurrentTime.textContent = "0:00";
    musicDuration.textContent = "-" + formatoTiempo(musicaFondo.duration);
  });
}

// --- Formato de tiempo mm:ss ---
function formatoTiempo(segundos) {
  const s = Math.max(0, Math.floor(segundos));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

// Detecta cuando el pergamino entra en el viewport
document.addEventListener("DOMContentLoaded", () => {
  const pergaminos = document.querySelectorAll(".pergamino-container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // se reinicia cuando sale
        }
      });
    },
    {
      threshold: 0.2, // se activa con el 20% visible
    },
  );

  pergaminos.forEach((perg) => observer.observe(perg));
});

// --- Animación de la línea de tiempo ---
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;

  const points = document.querySelectorAll(".timeline-point");
  const items = document.querySelectorAll(".timeline-item");

  // Crear la línea animada
  const line = document.createElement("div");
  line.classList.add("line-progress");
  timeline.appendChild(line);

  const speed = 4; // px por frame

  let currentHeight = 0;
  let animating = false;
  let animationFrameId = null;
  let pointPositions = [];

  // Calcular posiciones de los puntos
  function getPointPositions() {
    const timelineRect = timeline.getBoundingClientRect();

    return Array.from(points).map((point) => {
      const pointRect = point.getBoundingClientRect();

      return pointRect.top - timelineRect.top + point.offsetHeight / 2;
    });
  }

  // =========================
  // ANIMAR TIMELINE
  // =========================
  function animateLine() {
    if (!animating) return;

    // Altura actual de la timeline
    const timelineHeight = timeline.offsetHeight;

    currentHeight += speed;

    if (currentHeight > timelineHeight) {
      currentHeight = timelineHeight;
    }

    line.style.height = currentHeight + "px";

    // Activar puntos conforme pasa la línea
    pointPositions.forEach((pointPos, index) => {
      if (
        currentHeight >= pointPos &&
        !points[index].classList.contains("active")
      ) {
        points[index].classList.add("active");

        const texto = items[index].querySelector(".evento-texto");
        const icono = items[index].querySelector(".evento-icono");

        if (texto) {
          texto.classList.add("active");
        }

        if (icono) {
          icono.classList.add("active");
        }
      }
    });

    // Continuar animación
    if (currentHeight < timelineHeight) {
      animationFrameId = requestAnimationFrame(animateLine);
    } else {
      animationFrameId = null;
    }
  }

  // =========================
  // REINICIAR TIMELINE
  // =========================
  function resetTimeline() {
    // Detener animación anterior
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    animating = false;
    currentHeight = 0;

    // Reiniciar línea
    line.style.height = "0px";

    // Reiniciar puntos
    points.forEach((point) => {
      point.classList.remove("active");
    });

    // Reiniciar textos e iconos
    items.forEach((item) => {
      const texto = item.querySelector(".evento-texto");
      const icono = item.querySelector(".evento-icono");

      if (texto) {
        texto.classList.remove("active");
      }

      if (icono) {
        icono.classList.remove("active");
      }
    });
  }

  // Empezar completamente limpia
  resetTimeline();

  // =========================
  // OBSERVER
  // =========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Entró en pantalla
        if (entry.isIntersecting && !animating) {
          // Asegurarnos de empezar desde cero
          currentHeight = 0;
          line.style.height = "0px";

          // Recalcular posiciones
          pointPositions = getPointPositions();

          animating = true;

          // Iniciar animación
          animateLine();
        }

        // Salió de pantalla
        else if (!entry.isIntersecting) {
          resetTimeline();
        }
      });
    },
    {
      threshold: 0.3, // con 30% visible arranca
    },
  );
  observer.observe(timeline);
});

/* =========================
   UBICACIONES MÚLTIPLES
========================= */
const listaUbicaciones = document.getElementById("ubicacionesLista");
if (listaUbicaciones && evento.ubicaciones && evento.ubicaciones.length) {
  listaUbicaciones.innerHTML = evento.ubicaciones
    .map(
      (u) => `
        <li class="ubicacion-item">
          <div class="ubicacion-tipo">${u.tipo}</div>
          <a href="${u.mapa}" target="_blank" rel="noopener noreferrer" class="btn-link">
             ${u.nombre}
          </a>
        </li> `,
    )
    .join("");
}

const fechaTitulo = document.getElementById("fechaTitulo");
if (fechaTitulo && evento.fecha?.texto) {
  fechaTitulo.textContent = evento.fecha.texto;
}

/* =========================
   WHATSAPP DINÁMICO (BOTÓN)
========================= */
const btnWhatsapp = document.getElementById("btnWhatsapp");
if (btnWhatsapp && evento?.whatsapp) {
  const mensaje = evento.whatsapp.mensajeConfirmacion.replace(
    "{evento}",
    evento.nombre,
  );
  btnWhatsapp.href = `https://wa.me/${evento.whatsapp.telefono}?text=${encodeURIComponent(mensaje)}`;
}

/* =========================
   HASHTAG DINÁMICO
========================= */
const hashtagTexto = document.getElementById("hashtagTexto");

if (hashtagTexto && evento.hashtag) {
  hashtagTexto.textContent = evento.hashtag;
}

/* =========================
   PADRES Y PADRINOS DINÁMICOS
========================= */
const padresTitulo = document.getElementById("padresTitulo");
const padresNombres = document.getElementById("padresNombres");
const padrinosTitulo = document.getElementById("padrinosTitulo");
const padrinosNombres = document.getElementById("padrinosNombres");
const bloquePadrinos = document.getElementById("bloquePadrinos");
const seccionPadresPadrinos = document.getElementById("seccionPadresPadrinos");

// Padres
if (evento.padres && padresTitulo && padresNombres) {
  padresTitulo.textContent = evento.padres.titulo;
  padresNombres.innerHTML = evento.padres.nombres.join("<br>");
}

// Padrinos (opcional)
if (evento.padrinos && padrinosTitulo && padrinosNombres) {
  padrinosTitulo.textContent = evento.padrinos.titulo;
  padrinosNombres.innerHTML = evento.padrinos.nombres.join("<br>");
} else if (bloquePadrinos) {
  bloquePadrinos.style.display = "none";
}

/* =========================
   VIDEO OPCIONAL
========================= */
const seccionVideo = document.getElementById("seccionVideo");
const videoIframe = document.getElementById("videoPresentacion");

if (evento.video && evento.video.url && videoIframe) {
  videoIframe.src = evento.video.url;
} else if (seccionVideo) {
  seccionVideo.style.display = "none";
}

/* =========================
   ITINERARIO DINÁMICO
========================= */
const timelineLista = document.getElementById("timelineLista");

if (timelineLista && evento.itinerario && evento.itinerario.length) {
  timelineLista.innerHTML = evento.itinerario
    .map((item) => {
      return `
        <li class="timeline-item ${item.lado}">
          ${item.lado === "left"
          ? `
              <div class="evento-texto">
                <span class="hora">${item.hora}</span>
                <span class="nombre">${item.nombre}</span>
              </div>
              <div class="timeline-point"></div>
              <div class="evento-icono">
                <img src="${item.icono}" alt="${item.nombre}" class="icono" />
              </div>
              `
          : `
              <div class="evento-icono">
                <img src="${item.icono}" alt="${item.nombre}" class="icono" />
              </div>
              <div class="timeline-point"></div>
              <div class="evento-texto">
                <span class="hora">${item.hora}</span>
                <span class="nombre">${item.nombre}</span>
              </div>
              `
        }
        </li>
      `;
    })
    .join("");
}

/* =========================
   POLÍTICAS DEL EVENTO
========================= */
const seccionPoliticas = document.getElementById("seccionPoliticas");
const politicasTitulo = document.getElementById("politicasTitulo");
const politicasLista = document.getElementById("politicasLista");

if (
  evento.politicas &&
  evento.politicas.reglas &&
  evento.politicas.reglas.length &&
  seccionPoliticas &&
  politicasTitulo &&
  politicasLista
) {
  politicasTitulo.textContent = evento.politicas.titulo;

  politicasLista.innerHTML = evento.politicas.reglas
    .map((regla) => `<li>${regla}</li>`)
    .join("");
} else if (seccionPoliticas) {
  seccionPoliticas.style.display = "none";
}

// ✨ Microbrillos
for (let i = 0; i < 30; i++) {
  const brillo = document.createElement("div");
  brillo.className = "microbrillo";
  brillo.style.left = Math.random() * 100 + "vw";
  brillo.style.top = Math.random() * 100 + "vh";
  brillo.style.animationDelay = Math.random() * 3 + "s";
  document.body.appendChild(brillo);
}

// 💫 Partículas suaves
setInterval(() => {
  const p = document.createElement("div");
  p.className = "particula";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 8 + Math.random() * 6 + "s";
  document.body.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, 15000);
}, 800);

/* =========================
   CÓDIGO DE VESTIMENTA
========================= */
const seccionVestimenta = document.getElementById("seccionVestimenta");
const vestimentaTitulo = document.getElementById("vestimentaTitulo");
const vestimentaCodigo = document.getElementById("vestimentaCodigo");
const vestimentaDescripcion = document.getElementById("vestimentaDescripcion");
const vestimentaColor = document.getElementById("vestimentaColor");
if (
  evento.vestimenta &&
  seccionVestimenta &&
  vestimentaTitulo &&
  vestimentaCodigo &&
  vestimentaDescripcion &&
  vestimentaColor
) {
  vestimentaTitulo.textContent = evento.vestimenta.titulo;
  vestimentaCodigo.textContent = evento.vestimenta.codigo;
  vestimentaDescripcion.textContent = evento.vestimenta.descripcion;
  vestimentaColor.textContent = evento.vestimenta.colorReservado;
} else if (seccionVestimenta) {
  seccionVestimenta.style.display = "none";
}

/* =========================
   REGALOS
========================= */
const seccionRegalos = document.getElementById("seccionRegalos");
const regalosTitulo = document.getElementById("regalosTitulo");
const regalosMensaje = document.getElementById("regalosMensaje");

/* =========================
   LLUVIA DE SOBRES
========================= */
const regaloLluvia = document.getElementById("regaloLluvia");
const lluviaTitulo = document.getElementById("lluviaTitulo");
const lluviaDescripcion = document.getElementById("lluviaDescripcion");

/* =========================
   REGALOS FÍSICOS
========================= */
const regaloFisico = document.getElementById("regaloFisico");
const regalosFisicosTitulo = document.getElementById("regalosFisicosTitulo");
const regalosFisicosLista = document.getElementById("regalosFisicosLista");

/* =========================
   MESA DE REGALOS
========================= */
const regaloMesa = document.getElementById("regaloMesa");
const mesaRegalosTitulo = document.getElementById("mesaRegalosTitulo");
const mesasRegalosLista = document.getElementById("mesasRegalosLista");

/* =========================
   CARGAR REGALOS
========================= */
if (evento.regalos && seccionRegalos) {
  /* Título principal */
  if (regalosTitulo) {
    regalosTitulo.textContent =
      evento.regalos.titulo || "Sugerencia de Regalos";
  }
  /* Mensaje */
  if (regalosMensaje) {
    if (evento.regalos.mensaje) {
      regalosMensaje.textContent = evento.regalos.mensaje;
    } else {
      regalosMensaje.style.display = "none";
    }
  }

  /* =========================
     LLUVIA DE SOBRES
  ========================= */
  const lluvia = evento.regalos.lluviaSobres;
  if (lluvia?.activo && regaloLluvia) {
    if (lluviaTitulo) {
      lluviaTitulo.textContent = lluvia.titulo;
    }
    if (lluviaDescripcion) {
      lluviaDescripcion.textContent = lluvia.descripcion;
    }
  } else if (regaloLluvia) {
    regaloLluvia.style.display = "none";
  }

  /* =========================
     REGALOS FÍSICOS
  ========================= */
  const fisicos = evento.regalos.regalosFisicos;
  if (fisicos?.activo && fisicos.opciones?.length && regaloFisico) {
    if (regalosFisicosTitulo) {
      regalosFisicosTitulo.textContent = fisicos.titulo;
    }
    if (regalosFisicosLista) {
      regalosFisicosLista.innerHTML = fisicos.opciones
        .map((opcion) => `<span class="regalo-tag">${opcion}</span>`)
        .join("");
    }
  } else if (regaloFisico) {
    regaloFisico.style.display = "none";
  }

  /* =========================
     MESAS DE REGALOS
  ========================= */
  const mesas = evento.regalos.mesas;
  if (mesas?.activo && mesas.tiendas?.length && regaloMesa) {
    if (mesaRegalosTitulo) {
      mesaRegalosTitulo.textContent = mesas.titulo;
    }
    if (mesasRegalosLista) {
      mesasRegalosLista.innerHTML = mesas.tiendas
        .map((tienda) => {
          /*
           * Si todavía no existe enlace,
           * mostramos solamente el nombre.
           */
          if (!tienda.enlace) {
            return `
                <span class="mesa-sin-enlace">
                  ${tienda.nombre}
                </span>
              `;
          }
          /*
           * Cuando exista enlace,
           * automáticamente se convierte
           * en botón.
           */
          return `
              <a
                href="${tienda.enlace}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-mesa-regalos"
              >
                ${tienda.nombre}
              </a>
            `;
        })
        .join("");
    }
  } else if (regaloMesa) {
    regaloMesa.style.display = "none";
  }

  /* =========================
     COMPROBAR SI HAY OPCIONES
  ========================= */
  const hayLluvia = lluvia?.activo;
  const hayFisicos = fisicos?.activo && fisicos.opciones?.length;
  const hayMesas = mesas?.activo && mesas.tiendas?.length;
  /*
   * Si el cliente desactiva absolutamente
   * todas las opciones, desaparece la
   * sección completa.
   */
  if (!hayLluvia && !hayFisicos && !hayMesas) {
    seccionRegalos.style.display = "none";
  }
} else if (seccionRegalos) {
  seccionRegalos.style.display = "none";
}
