import Head from 'next/head'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from "axios";

const queryClient = new QueryClient()
const headers = {
    "x-requested-with": "Accept-Language"
};

function Page() {
  const { isLoading, error, data, isFetching } = useQuery(["message"], () =>
  axios.get("https://cors-anywhere.herokuapp.com/https://shouldideploy.today/api?tz=UTC", { headers: headers})
    .then((res) => res.data.message)
  );
  console.log(isFetching, isLoading, error, data)

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="container">
    <Head>
      <title>Rebrain demo APP</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div>
        <img src="/logo_rebrain.svg" alt="Rebrain" />
      </div>

      <h1 className="title">
        Should I deploy <a>today</a>?
      </h1>

      <p className="deployMessage">
      {isFetching ? "Requesting API..." : data.toString()} 
      </p>
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        gabriel-dantas
      </a>
    </footer>

    <style jsx>{`
      .container {
        background-color: #18181a;
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        color: #FAFAFA;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #ff48be;
        text-decoration: none;
      }

      .deployMessage {
        margin: 30px 0 0 0;
        font-weight: 500;
        color: #FFA000;
        text-align: center;
        font-size: 2.75rem;
      }

      .title {
        color: #fafafa;
        margin: 60px 0 0 0;
        line-height: 1.15;
        font-size: 2rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .btn-action {
        appearance: none;
        background-color: transparent;
        border: 2px solid #5bffda;
        border-radius: 15px;
        box-sizing: border-box;
        color: #5bffda;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        margin: 0;
        min-height: 60px;
        min-width: 0;
        outline: none;
        padding: 16px 24px;
        text-align: center;
        text-decoration: none;
        transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 100%;
        will-change: transform;
      }
      
      .btn-action:disabled {
        pointer-events: none;
      }
      
      .btn-action:hover {
        color: #18181a;
        background-color: #5bffda;
        box-shadow: rgba(0, 0, 0, 0.5 5) 0 8px 15px;
        transform: translateY(-2px);
      }
      
      .btn-action:active {
        box-shadow: none;
        transform: translateY(0);
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
  )
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page/>
    </QueryClientProvider>
  )
}
