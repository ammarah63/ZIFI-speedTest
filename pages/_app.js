import { Footer, Header } from "@/components";
import "@/styles/globals.css";
//locationData={location}

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="h-screen px-3 md:px-8">
        <div className="h-[5vh]">
          <Header />
        </div>
        <div className="h-[89vh] md:h-[87vh] 3xl:h-[88vh] 4xl:h-[88vh]">
          {" "}
          <Component {...pageProps} />
        </div>
        <div className=" h-[5vh]">
          {" "}
          <Footer />
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const clientIp =
//     context.req.headers["x-forwarded-for"] ||
//     context.req.connection.remoteAddress;

//   try {
//     const res = await fetch(`http://ip-api.com/json/${clientIp}`);
//     // const res = await fetch(`http://ip-api.com/json/154.192.1.32`);
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status}`);
//     }
//     console.log(data);

//     const location = {
//       city: data.city || null,
//       country: data.country || null,
//       countryCode: data.countryCode || null,
//     };

//     return {
//       props: { location },
//     };
//   } catch (error) {
//     console.error("Error fetching IP data:", error);

//     return {
//       props: { location: null },
//     };
//   }
// }
