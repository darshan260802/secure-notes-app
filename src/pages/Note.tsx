import { useLayoutEffect, useState } from "react"
import { getNotes } from "../api/note"
import { useNavigate } from "react-router"
import { MessageInstance } from "antd/es/message/interface"

export default function Note({messageApi}: {messageApi: MessageInstance}) {

    const navigation = useNavigate()
    const [notes, setNotes] = useState<any[]>([])

    useLayoutEffect(() => {
        getNotes().then((data:any) => {
            setNotes(data.notes)
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