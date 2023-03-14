import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function Navegador (props) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(props.url)
  }, [props.url, navigate])

  return <></>
}