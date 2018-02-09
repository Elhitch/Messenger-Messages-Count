/*
  !!! The script manages to successfully print a user ID and the count of messages exchanged with that user.
      Both values are separated by a dash.
  !!! To do:
      * Replace the user IDs with real names (Facebook JavaScript SDK fails so far, keep on trying!);
      * Do some pretty formatting;
      * Determine how the IDs are selected in the source code and control that;
      * Add search functionality (given a specific ID);
      * Fix the bug where groups are called 'null'.
*/

/*
  To run this script, access https://www.messenger.com, right click anywhere on the screen, select 'Inspect',
  then navigate to the Console in the new window that comes up, copy and paste the code there, then run.
*/
function getSource() {
  try {
    return new XMLHttpRequest();
  } catch (error) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error) {}
  try {
   	return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

document.write("<html><title>Messenger Statistics</title><head><script></script></head><body>");
var data = "";
var accountID = "";
var otherUserIDs;
var otherUserIDsCnt;
var messagesCount;
var messagesCountCnt;
var i;
var workOn;

var request = getSource();
request.open("GET", "https://www.messenger.com/", true);
request.send(null);
request.onreadystatechange = function() {
  if (request.readyState == 4) {
    data = request.responseText;
    // Gets the entire line containing the current user's ID:
    var accountIDRaw = String(data.match(/ACCOUNT_ID":"[0-9]+/));
    // Gets the ID only of the current user:
    accountID = String(accountIDRaw.match(/\d+/));
    // The ID is going to be used to prevent information about this user to be read in the script later on.

    document.title = "Messenger Statistics";
    document.write('Your account ID is ' + accountID + '. ');
    document.write('Open this link in a new tab to verify.'.link("https://www.facebook.com/" + accountID));
    document.write('<br><br>');

    // Saves all IDs into an array (if the chat is in fact a group, 'null' is saved). The count of all IDs is saved in a separate variable:
    otherUserIDs = data.match(/other_user_id":(null|"[0-9]+)/g);
    otherUserIDsCnt = data.match(/other_user_id":(null|"[0-9]+)/g).length;
    // Does the same for the amount of messages exchanged with each ID saved:
    messagesCount = data.match(/messages_count":[0-9]+/g);
    messagesCountCnt = data.match(/messages_count":[0-9]+/g).length;
    if (messagesCountCnt === otherUserIDsCnt) {
      var loopUntil = messagesCountCnt;
      for (i = 0; i < loopUntil; i++) {

        if (otherUserIDs[i] != null) {
          workOn = (String)(otherUserIDs[i].match(/\d+/));
          document.write(workOn.link("https://www.facebook.com/" + workOn));
        }
        else {
          document.write("Unknown group");
        }
        document.write(" - ");
        document.write(messagesCount[i].match(/\d+/));
        document.write("<br>");
      }
    }
    else alert("Count of messages and count of other users does not match!");
  }
}
document.write("</body></html>");
