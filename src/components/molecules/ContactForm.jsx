import { useState, useRef } from "react";

function Label({ children }) {
  return (
    <label className="block text-sm font-medium text-gray-300 mt-4">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      className="mt-1 block w-full rounded-lg p-3 bg-gray-800 text-gray-100 
                 border border-gray-700 placeholder-gray-400
                 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 
                 outline-none transition-all duration-300"
      {...props}
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      className="mt-1 block w-full rounded-lg p-3 bg-gray-800 text-gray-100 
                 border border-gray-700 placeholder-gray-400
                 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 
                 outline-none transition-all duration-300 resize-none"
      {...props}
    />
  );
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: "", text: "" });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxcpyncpjvw1mjpjU5TfaEyPIIMCYYTUhO8efVhNUKP6iFwUDcWrhsw20SnrVEB-RPuhw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage({ type: "", text: "" });

    const formData = {
      nombre: nameRef.current.value,
      correo: emailRef.current.value,
      asunto: subjectRef.current.value,
      mensaje: messageRef.current.value,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setResponseMessage({
        type: "success",
        text: "Mensaje enviado",
      });

      nameRef.current.value = "";
      emailRef.current.value = "";
      subjectRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: "Error al enviar el mensaje",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/90 backdrop-blur
                   border border-gray-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">
          Contáctame
        </h2>

        <fieldset disabled={loading} className="flex flex-col gap-4">
          <div>
            <Label>Nombre</Label>
            <Input ref={nameRef} placeholder="Tu nombre" required />
          </div>

          <div>
            <Label>Correo</Label>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Tu correo"
              required
            />
          </div>

          <div>
            <Label>Asunto</Label>
            <Input ref={subjectRef} placeholder="Asunto" required />
          </div>

          <div>
            <Label>Mensaje</Label>
            <TextArea
              ref={messageRef}
              rows={6}
              placeholder="Escribe tu mensaje"
              required
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-medium transition-all duration-300
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>

        {responseMessage.text && (
          <p
            className={`mt-4 text-center font-medium ${
              responseMessage.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {responseMessage.text}
          </p>
        )}
      </form>
    </div>
  );
}
