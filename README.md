# Messenger-Messages-Count

### What does this script do?
The Messenger Messages Counter is a simple script used to quickly preview the amount of messages exchanged between the person running the script and a set of other users. The script is WIP with many planned improvements over time.

### How do I run the script?
In order to run the script, copy the content of the messageCounter.js file into the console of your web browser while the active tab is running [Messenger](https://www.messenger.com), then simply press 'Enter'. The page is going to be rewritten into a blank one - first, your ID is going to be displayed along with a link to your profile. Each new line has the following format:

\***Other user ID\*** - \***Messages count\***
You could open in the \***Other user ID\*** in a new tab in order to preview Facebook profile. Some 'Other user ID' fields might contain 'null' as content - see below for details.

### How does it work?
First of all, the script requests the source code of the webpage. Due to the [Same Origin Policy](https://www.w3.org/Security/wiki/Same_Origin_Policy), the code has to be called from Messenger itself. Once the source code is available, the script searches for specific matches using regular expressions and extracts the data, then writes it to the screen using document.write(). Unfortunately, since groups do not have IDs, their data can't be extracted as of now.
