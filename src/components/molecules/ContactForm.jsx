import { useState, useRef } from "react";

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
      className="mt-1 block w-full rounded-lg p-3 border border-gray-300 
                 focus:border-red-500 outline-none transition-all duration-300"
      {...props}
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      className="mt-1 block w-full rounded-lg p-3 border border-gray-300 
                 focus:border-red-500 outline-none transition-all duration-300"
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
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Contáctame</h2>

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
          className={`mt-6 w-full text-white py-3 rounded-lg transition 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {responseMessage.text && (
          <p
            className={`mt-4 text-center font-medium ${
              responseMessage.type === "success"
                ? "text-black"
                : "text-red-600"
            }`}
          >
            {responseMessage.text}
          </p>
        )}
      </form>
    </div>
  );
}
