import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useExamStore from "../store/useExamStore"

function DetailExamUser() {

    const { id } = useParams()
    const { exams,getExam } = useExamStore()

    useEffect(() => {
        getExam(id)
    },[id])

    console.log(exams)

  return (
    <div>

    </div>
  )
}

export default DetailExamUser