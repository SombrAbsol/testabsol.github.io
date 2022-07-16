---
title: SOS/A-OK/Thank-You Mail Converter (PMD1)
description: SOS/A-OK/Thank-You Mail Converter (PMD1)
---
# Pokémon Mystery Dungeon: Red and Blue Rescue Team
## Convertisseur de Lettres S.O.S./O.K./Remerciement
Use this tool to generate:
- an A-OK Mail from an SOS Main
- a Thank-You Mail from an SOS Mail
- a Thank-You Mail from an A-OK Mail

Regarding special characters:
- For the male symbol `♂`, use instead `#`
- For the feminine symbol `♀`, use instead `%`
- For the ellipsis `…`, use instead `.`

Source: [http://www.upokecenter.com/games/dungeon/guides/sosmail.php](https://web.archive.org/web/20150118004601/http://www.upokecenter.com/games/dungeon/guides/sosmail.php)<br><br>

<script src="/assets/js/tools/PMD1/items-fr.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/pokemon-fr.js" type="text/javascript">
</script>
<script type="text/javascript">
  let PasswordTooShort="The password was invalid because it contained fewer than 54 characters. Please re-enter the password as it appears in the game and try again."
  let NoPassword="No password was entered."
  let InvalidPasswordLong="The password was invalid. Please re-enter the password and try again."
  let NotSOSMail="The password given was not an SOS Mail password."
  let NotAOKMail="The password given was not an A-OK Mail password."
  let SOSMailEnteredInAOK="The password given appears to be an SOS Mail password instead of an A-OK Mail password. Do you want to generate an A-OK Mail from this password? If you do, select OK."
  let AOKMailEnteredInSOS="The password given appears to be an A-OK Mail password instead of an SOS Mail password. Do you want to generate a Thank-You Mail from this password? If you do, select OK."
  let BasementFloor="BXXF"
  let AboveGroundFloor="XXF"
  let InvalidPassword="The password is invalid."
  let DifficultyLine="Difficulty:"
  let IDLine="ID :"
  let PlaceLine="Place:"
  let ClientLine="Client:"
  let RescueChancesLine="Rescue chances:"
</script>
<script src="/assets/js/tools/PMD1/sosmail.js" type="text/javascript">
</script>
<script src="/assets/js/tools/PMD1/diff.js" type="text/javascript">
</script>
<script type="text/javascript">
    //<![CDATA[
    let AboveGround = [
        0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0
    ]
    
    function IsAboveGround(d) {
        if (d >= AboveGround.length) return 1
        return AboveGround[d]
    }
    
    function showitems(name) {
        document.write("<select id=\"" + name + "\">");
        for (let i = 0; i < items.length; i++) {
            document.write("<option value=\"\">" + items[i] + " [" + i.toString(16) + "]</option>");
        }
        document.write("</select>");
    }
    
    function showpokemon(name) {
        document.write("<select id=\"" + name + "\">");
        for (let i = 0; i < pokemon.length; i++) {
            document.write("<option value=\"\">" + pokemon[i] + "</option>");
        }
        document.write("</select>");
    }
    
    
    let debug = 0
    
    function entrytopass(x) {
        x = x.replace(/[\n\s\r\'\"]/g, "")
            .replace(/[\u2642]/g, "#")
            .replace(/[\u2640]/g, "%")
            .replace(/[\{\(\[]m([a\u00e2]le?)?[\)\]\}]/gi, "#")
            .replace(/[\{\(\[]f(em(ale|elle)?)?[\)\]\}]/gi, "%")
            .replace(/[\{\(\[]w(eib(l(ich)?)?)?[\)\]\}]/gi, "%")
            .replace(/[\{\(\[]m(acho)?[\)\]\}]/gi, "#")
            .replace(/[\{\(\[]h(em(bra)?)?[\)\]\}]/gi, "%")
            .replace(/[\{\(\[]m[a\u00e4\u00c4]nn(l(ich)?)?[\)\]\}]/gi, "#")
            .replace(/[\{\(\[]\.\.?\.?[\)\]\}]/g, ".")
            .replace(/[\{\(\[][\u2026][\)\]\}]/g, ".")
            .replace(/[\u2026]/g, ".")
            .toUpperCase()
        testx = x.replace(/\.\.\./g, ".")
        if (testx.length == 54)
            x = testx
        return x
    }
    
    function formatpass(x) {
        x = entrytopass(x)
        return x.substr(0, 5) + " " +
            x.substr(5, 8) + " " +
            x.substr(13, 5) + "\r\n" +
            x.substr(18, 5) + " " +
            x.substr(23, 8) + " " +
            x.substr(31, 5) + "\r\n" +
            x.substr(36, 5) + " " +
            x.substr(41, 8) + " " +
            x.substr(49, 5) + "\r\n"
    }
    
    let baditems = "EDEEEFB1E924D8D2B0DC323334C2ECF0"
    
    function option(x) {
        return parseInt(x.value)
    }
    
    function isbaditem(x) {
        if (x >= 0xF0) return 0
        for (let i = 0; i < baditems.length / 2; i++) {
            if (x == c2c(baditems, i))
                return 1
        }
        return 0
    }
    
    function showrewards(name){
        document.write("<select id=\""+name+"\">");
        for(let i=0;i<items.length;i++){
            if(!isbaditem(i)){
                document.write("<option value=\""+i+"\">"+items[i]
                    //      +" ["+i.toString(16)+"]"
                    +
                    "</option>");
            }
        }
        document.write("</select>");
    }

    function decodemission(pass) {
        let diffstring = "EDCBAS*"
        let client = pass[12] | (pass[13] << 8)
        let clientname = ""
        for (let i = 0; i < 10; i++) {
            if (pass[20 + i] == 0) break
            clientname += String.fromCharCode(pass[20 + i])
        }
        let clientstr = ClientLine + " " + clientname + " (" + pokemon[client] + ")"
        let placestr = PlaceLine + " " + dungeons[pass[4]] + " "
        if (IsAboveGround(pass[4]))
            placestr += AboveGroundFloor.replace("XX", pass[5])
        else
            placestr += BasementFloor.replace("XX", pass[5])
        let id = pass[16] | (pass[17] << 8)
        let idstr = IDLine + " " + (id % 10000) + "\r\n" +
            RescueChancesLine + " " + pass[44] + "\r\n" +
            DifficultyLine + " " + diffstring.charAt(GetDifficulty(0, pass[4], pass[5]))
        return clientstr + "\r\n" + placestr + "\r\n" + idstr + "\r\n"
    }
    
    function genmailex(mail, flags, mailtype) {
        let pass = []
        let x = entrytopass(mail)
        if (x.length == 0) {
            alert(NoPassword)
            return 0
        }
        if (x.length < 54) {
            alert(PasswordTooShort)
            return 0
        }
        if (!convertpass(x, pass)) {
            alert(InvalidPasswordLong)
            return 0
        } else if (pass[0] != mailtype) {
            if (mailtype == 1) {
                if (pass[0] == 4) {
                    if (confirm(AOKMailEnteredInSOS)) {
                        flags = 2;
                        document.getElementById("aok").value = formatpass(x);
                    } else {
                        return 0;
                    }
                } else {
                    alert(NotSOSMail)
                    return 0
                }
            } else if (mailtype == 4) {
                if (pass[0] == 1) {
                    if (confirm(SOSMailEnteredInAOK)) {
                        flags = 1;
                        document.getElementById("sos").value = formatpass(x);
                    } else {
                        return 0;
                    }
                } else {
                    alert(NotAOKMail)
                    return 0
                }
            }
        }
        document.getElementById("mission").value = decodemission(pass)
        if (flags & 1) {
            pass[0] = 4 //A-OK mail ID
            pass[40] = pass[36]
            pass[41] = pass[37]
            pass[42] = pass[38]
            pass[43] = pass[39]
            pass[44] = pass[44] - 1 //rescue chances left
            //web.archive.org/web/20080913124421/http://works even if line below is commented out
            document.getElementById("aok").value = formatpass(datatopass(pass))
        }
        if (flags & 2) {
            let itemidx = option(document.getElementById("item"))
            pass[0] = 5 //Thank-You mail ID
            if (itemidx) {
                pass[33] = 1
                pass[34] = itemidx & 0xFF
                pass[35] = (itemidx >> 8) & 0xFF
            }
            document.getElementById("ty").value = formatpass(datatopass(pass))
        }
        return 1
    }
    
    function genaok() {
        if (genmailex(document.getElementById("sos").value, 1, 1)) {
            document.getElementById("sos").value = formatpass(document.getElementById("sos").value)
        }
    }
    
    function genaokty() {
        if (genmailex(document.getElementById("sos").value, 3, 1)) {
            document.getElementById("sos").value = formatpass(document.getElementById("sos").value)
        }
    }
    
    function genty() {
        if (genmailex(document.getElementById("aok").value, 2, 4)) {
            document.getElementById("aok").value = formatpass(document.getElementById("aok").value)
        }
    }
    
    function decsos() {
        let x = entrytopass(document.getElementById("sos").value)
        let pass = []
        if (!convertpass(x, pass)) {
            alert(InvalidPassword)
        } else {
            x = datatopass(pass)
            document.getElementById("sos").value = formatpass(x)
            if (debug) {
                document.getElementById("data").value = tostr(pass)
            }
        }
    }
    
    function encsos() {
        let pass = document.getElementById("data").value.split(",")
        for (let i = 0; i < pass.length; i++) {
            pass[i] = parseInt(pass[i], 16)
        }
        x = datatopass(pass)
        document.getElementById("sos").value = formatpass(x)
        if (debug) {
            document.getElementById("data").value = tostr(pass)
        }
    }
    //]]>
</script>

<p>SOS Mail Password:
  <br>
  <textarea id="sos" cols="30" rows="5"></textarea>
  <br>
  <script type="text/javascript">
    /*
    if (debug) {
      document.write('<input type="button" value="Decode SOS Mail" onclick="decsos()"/><br>')
      document.write('<textarea id="data" cols="30" rows="6"></textarea><br>')
      document.write('<input type="button" value="Encode SOS Mail" onclick="encsos()"/><br>')
    }
    */
  </script>
  <input type="button" value="Generate A-OK Mail" onclick="genaok(this.form)" />
  <br>
  <input type="button" value="Generate A-OK and Thank-You Mail" onclick="genaokty()" />
  <br>
  <br>
  A-OK Mail Password:
  <br>
  <textarea id="aok" cols="30" rows="5"></textarea>
  <br>
  <br>
  Item to send to Thank-You Mail (optional):
  <br>
  <script type="text/javascript">
    showrewards("item")
  </script>
  <br>
  <br>
  <input type="button" value="Generate Thank-You Mail" onclick="genty(this.form)" />
  <br>
  <br>
  Thank-You Mail Password:
  <br>
  <textarea id="ty" cols="30" rows="5"></textarea>
  <br>
  <br>
  Rescue Mission Data:
  <br>
  <textarea id="mission" cols="30" rows="6"></textarea>
</p>