// Node modules
const path = require('path');

// pdfStyle methods
const { setStyleObjProperty, getStyleObjProperty, startMount } = require(`..${path.sep}instances${path.sep}pdfStyle`);

module.exports = {
    data: {
        name: 'fontsubscript',
        params: [null],
        description: "Toggles subscript on the current font"
    },
    async execute(messageSent, parameters = null){

		// Gets the discord message's data
        const currentChannel = messageSent.channel; 

        // Checks if a document is already in the making
		const { mounting } = require(`..${path.sep}instances${path.sep}pdfStyle`);
		if(!mounting){
			startMount();
		}

        // Checks if subscript is enabled
        let returnMessage = "";
        if(getStyleObjProperty("fontSuperscript")){
            await setStyleObjProperty("fontSuperscript", false);
            returnMessage += "Superscript font: **Disabled**\n";
        }

        // Toggles Superscript
        const subscriptEnabled = await setStyleObjProperty("fontSubscript", !getStyleObjProperty("fontSubscript"));
		return await currentChannel.send(returnMessage + `Subscript font: **${subscriptEnabled ? "Enabled" : "Disabled"}**`);
    }
}