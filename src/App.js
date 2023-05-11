import React, { createElement, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const App = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [canWriteToClipboard, setCanWriteToClipboard] = useState(false);
    
    useEffect(() => {
        console.log(navigator.permissions);
        console.log("Checking clipboard write permission");
        navigator.permissions.query({ name: "clipboard-write"}).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                console.log("Can write to clipboard");
                setCanWriteToClipboard(true);
            }
        })
    }, [])
    
    const updateUrl = (event) => {
        try {
            const parsedUrl = new URL(event.target.value);
            parsedUrl.search = ""
            setIsValidUrl(true);
            setTargetUrl(parsedUrl.href);    
        } catch (err) {
            setTargetUrl("");
            setIsValidUrl(false);
        }
    }

    const gotoTargetLink = () => {
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", targetUrl);
        linkElement.setAttribute("target", "_blank");
        linkElement.click();
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(targetUrl);
    }

    return (
        <Container>
            <h3>QREX - Query Removal Extractor</h3>
            <Form.Group className="mb-3">
                <Form.Label>
                    Source URL {isValidUrl ? "" : "(Invalid URL)"}
                </Form.Label>
                <Form.Control as="textarea" rows={5} onChange={updateUrl}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Target URL
                </Form.Label>
                <Form.Control readOnly as="textarea" rows={5} value={targetUrl} />
            </Form.Group>
            <Button disabled={!isValidUrl} className="me-3" onClick={gotoTargetLink}>Go To Target Link</Button>
            <Button disabled={!(isValidUrl && canWriteToClipboard)} className="me-3" onClick={copyToClipboard}>Copy to Clipboard</Button>
        </Container>
    )
}

export default App;