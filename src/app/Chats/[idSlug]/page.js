import MainPage from "../../../Components/MainPage/MainPage"
export default function Home({params}) {
  return (
    <>
      <MainPage chatID={params.idSlug}/>
    </>
  )
}
