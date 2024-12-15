import React, { useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";
import "./context.css";

//These file determin how the chatbot will work and how the chatbot will interact with the user//
// Create a context with default values
export const Context = React.createContext({
    extended: false,
    setExtended: () => { }
});

// Context provider component
const ContextProvider = (props) => {
    // Define state variables
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to delay the display of each word in the response
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    // Function to reset the chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    // Modify the onSent function to include default display format before combining with user input prompt
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);



        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }


        // Process the response
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // Further process the response
        let newResponse2 = newResponse.split("*").join("<br>"); // Replace * with <br>

        // Handle ``` code blocks
        let codeBlocks = newResponse2.split("```");
        let formattedResponse = "";
        for (let i = 0; i < codeBlocks.length; i++) {
            if (i % 2 === 0) {
                let temp = codeBlocks[i].split("`");
                for (let j = 0; j < temp.length; j++) {
                    if (j % 2 === 0) {
                        let subTemp = temp[j].split("**<");
                        for (let k = 0; k < subTemp.length; k++) {
                            if (k === 0) {
                                formattedResponse += subTemp[k];
                            } else {
                                let endIdx = subTemp[k].indexOf(">**");
                                if (endIdx !== -1) {
                                    formattedResponse += "**&lt;" + subTemp[k].substring(0, endIdx) + "&gt;**" + subTemp[k].substring(endIdx + 3);
                                } else {
                                    formattedResponse += "**<" + subTemp[k];
                                }
                            }
                        }
                    } else {
                        formattedResponse += "<code>" + temp[j].replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>";
                    }
                }
            } else {
                formattedResponse += "<pre><code>" + codeBlocks[i].replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code></pre>";
            }
        }

        formattedResponse = formattedResponse.replace(/(\[(https?:\/\/[^\s]+)\])|((https?:\/\/[^\s]+))/g, function(match, group1, group2, group3) {
            if (group1) {
              return `<a href="${group2}">${group2}</a>`;
            } else if (group3) {
              return `<a href="${group3}">${group3}</a>`;
            }
            return match;
          });

        // Handle ### and ## before processing numbers
        formattedResponse = formattedResponse.replace(/###/g, '<br>');
        formattedResponse = formattedResponse.replace(/##/g, '<br>');

        // Separate code blocks from the rest of the text
        let parts = formattedResponse.split(/(<\/?code>|<\/?pre>)/);
        for (let i = 0; i < parts.length; i++) {
            // Only replace numbers followed by a period outside of code blocks
            if (!parts[i].startsWith('<code>') && !parts[i].startsWith('</code>') && !parts[i].startsWith('<pre>') && !parts[i].startsWith('</pre>')) {
                parts[i] = parts[i].replace(/(\b\d)\.(?=\s|$)/g, '<br><hr>$1.');
            }
        }
        formattedResponse = parts.join("");

        // Split the response into words
        let newResponseArray = formattedResponse.split(" ");

        // Delay the display of each word in the response
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");

    }

    // Define the context value
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    // Return the context provider with the defined value
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

// Define prop types for the context provider
ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ContextProvider;
