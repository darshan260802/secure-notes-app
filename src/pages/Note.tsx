import { useLayoutEffect, useState } from "react"
import { getNotes } from "../api/note"
import { useNavigate } from "react-router"

export default function Note() {

    const navigation = useNavigate()
    const [notes, setNotes] = useState([])

    useLayoutEffect(() => {
        getNotes().then((data) => {

        }).catch((error) => {
            if(error.status && error.status === 401) {
                navigation('/auth');
                return;
            }
            console.error(error)
        })
    }, [])

    return <h1>Note</h1>
}