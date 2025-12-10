import { useState, useRef,useMemo } from "react";

function Label(props){
    return(
        <label className="block text-sm font-medium text-gray-700">
            {props.children}
        </label>
    );
}

function Input(props, ...rest){
    return (
        <input
            type= {props.type || "text"}
            className="mt-1 block w-full rounded-lg p-4 border-white hover:border-red-500 transition-all duration-300"
            placeholder= {props.placeholder || "" }
            {...rest}


        />
    );
}


function TextArea(props, ...rest){
    return (
        <textarea
            className="mt-1 block w-full rounded-lg p-4 border border-white hover:border-red-500 transition-all duration-300" 
            placeholder= {props.placeholder || "" }
            rows={props.rows || 4}
            {...rest}

        />
    )
}


export default function ContactFrom() {

    const [loading, setLoading] = useState(false);

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const messageRef = useRef(null)


    const SubmiButton = useMemo(() =>{

        if (loading){
            return (
                <>loading...</>

            );

        }

        return (
            <button 
                type="submit"
                className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:border-red-500" 

            />
        )

    })


    return (
        <>
            <fieldset className="w-full flex-col gap-4">
            <Label>Name</Label>
            <Input placeholder="Your Name" />
            <Label>Email</Label>
            <Input type="email" placeholder="Your Email" />
            <Label>Message</Label>
            <TextArea placeholder="Your Message" rows={6} />

        </fieldset>

        </>
    );
}