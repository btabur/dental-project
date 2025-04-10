"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { backendApi } from "../../../utilis/helper";
import Image from "next/image";


const ResetPasswordPage = (props) => {
  const router = useRouter();
  const params = use(props.params); // ✅ `params`'i unwrap et
  const { token } = params; // ✅ Artık doğrudan erişebilirsin

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${backendApi}/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Şifre başarıyla değiştirildi!");
        setTimeout(() => router.push("/giris-yap"), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Bir hata oluştu, lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (

    <main className=" min-h-[90vh] flex items-center ">
    <div className="md:w-1/2 w-full min-h-[90vh] flex items-center justify-center ">
     
      <form onSubmit={handleSubmit} className="w-80 p-4 border rounded">

      <h2 className="text-2xl font-bold mb-4">Şifreyi Sıfırla</h2>
        <input
          type="password"
          placeholder="Yeni Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-[#28c851] text-white"
          disabled={loading}
        >
          {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
    <article className='hidden min-h-[93vh] w-1/2 lg:flex'>
        <Image
        alt='bg-login'
        src={'/bg-login.webp'}
        width={800}
        height={900}
        className='w-full h-full object-cover'
        />

      </article>
  </main>
   
  );
};

export default ResetPasswordPage;
