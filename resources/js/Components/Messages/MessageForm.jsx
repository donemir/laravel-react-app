import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmojiPicker from "@emoji-mart/react";
import emojidata from "@emoji-mart/data";

import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #ccc;
    overflow: hidden;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`;

const EmojiIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props["data-show"] ? "#ccc" : "transparent"};
    padding: 1px;
    cursor: pointer;
    font-size: 20px;
    border-radius: 50%;

    &:hover {
        background-color: #ccc;
    }
`;

const SendButton = styled(Button)`
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #007bff !important;
    color: #fff !important;
    font-weight: bold !important;
    font-size: 14px !important;

    &:hover {
        background-color: #0056b3 !important;
    }

    &:disabled {
        background-color: #ccc !important;
        cursor: not-allowed !important;
    }
`;

const EmojiPickerWrapper = styled.div`
    position: relative;
`;

const EmojiPickerAbsolute = styled(EmojiPicker)`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
`;

const CharacterCounter = styled.div`
    color: #999;
    font-size: 12px;
`;

function MessageForm({ handleSubmit, data, setData, errors, processing }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiSelect = (emoji) => {
        const updatedContent = (data.content || "") + emoji.native;
        setData("content", updatedContent);
        textareaRef.current.focus();
    };

    const handleSend = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    const characterCount = data.content ? data.content.length : 0;

    return (
        <Container>
            <InputWrapper>
                <TextField
                    multiline
                    minRows={3}
                    maxRows={6}
                    name="content"
                    value={data.content || ""}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
            </InputWrapper>
            <Row>
                <EmojiIcon
                    data-show={showEmojiPicker}
                    onClick={handleEmojiClick}
                    role="button"
                    aria-label="Emoji"
                >
                    <span
                        role="img"
                        aria-label="Smiley"
                        style={{ fontSize: "24px" }}
                    >
                        😊
                    </span>
                </EmojiIcon>
                <CharacterCounter>{characterCount} characters</CharacterCounter>
            </Row>
            {showEmojiPicker && (
                <EmojiPickerWrapper>
                    <EmojiPickerAbsolute
                        data={emojidata}
                        onSelect={handleEmojiSelect}
                    />
                </EmojiPickerWrapper>
            )}
            <SendButton
                variant="contained"
                disabled={processing}
                onClick={handleSend}
            >
                Send
            </SendButton>

            {errors.content && (
                <div style={{ color: "red" }}>{errors.content}</div>
            )}
        </Container>
    );
}

export default MessageForm;
