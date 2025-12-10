import { useState, useEffect, useRef } from "react";

function Label({ children }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mt-4">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      type={props.type || "text"}
      className="mt-1 block w-full rounded-lg p-3 border border-gray-300 
                 focus:border-red-500 outline-none transition-all duration-300"
      placeholder={props.placeholder || ""}
      {...props}
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      className="mt-1 block w-full rounded-lg p-3 border border-gray-300 
                 focus:border-red-500 outline-none transition-all duration-300"
      placeholder={props.placeholder || ""}
      rows={props.rows || 4}
      {...props}
    />
  );
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  // controlados:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ref para saber si componente sigue montado (evita setState en componente desmontado)
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // helper sleep
  const sleep = (ms) => new Promise((resolve) => {
    const id = setTimeout(() => resolve(id), ms);
    // not storing id here, we rely on mountedRef to avoid setState after unmount
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: inicio", { loading });
    if (loading) {
      console.log("handleSubmit: ya está cargando, saliendo.");
      return;
    }

    setLoading(true);
    console.log("handleSubmit: setLoading(true)");

    // Espera 2 segundos (asegura secuencia)
    await sleep(2000);

    // Comprueba que el componente sigue montado antes de setState
    if (!mountedRef.current) {
      console.warn("Componente desmontado antes de completar el timeout.");
      return;
    }

    setLoading(false);
    console.log("handleSubmit: setLoading(false) después de 2s");

    // limpia los campos controlados
    setName("");
    setEmail("");
    setMessage("");

    console.log("handleSubmit: campos reseteados");
  };

  useEffect(() => {
    console.log("loading cambió:", loading);
  }, [loading]);

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Contáctame</h2>

        <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
          <div>
            <Label>Nombre</Label>
            <Input
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label>Correo</Label>
            <Input
              type="email"
              placeholder="Tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Mensaje</Label>
            <TextArea
              placeholder="Escribe tu mensaje"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full text-white py-3 rounded-lg transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
