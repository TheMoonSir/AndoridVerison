<h2>For use this, download node.js and do Npm install</h2>
<p>When the install end, then do npm run dev.</p>

<h1>Just saying that builded by Nextjs. don't change if you dont know. and if you have issue so mhm</h1>
btw full code on LUA:

```lua

local HttpService = game:GetService("HttpService")
local httpService = cloneref(game:GetService('HttpService'))
-- Made by TheMoon (be smart if you want)

getgenv()._Information_ = {
    _HostNameUser_ = "wgtjvmz4mnh"
}

local __ExecuterName = identifyexecutor()
local url = 'https://andorid.xzendevx.xyz/api/v1/Andorid/'..getgenv()._Information_['_HostNameUser_']..'/SendScript'


if __ExecuterName == 'Codex' then

    local function decompile(scr)
        local s, bytecode = pcall(getscriptbytecode, scr)
        if not s then
            return `failed to get bytecode { bytecode }`
        end

        local response = request({
            Url = 'https://unluau.lonegladiator.dev/unluau/decompile',
            Method = 'POST',
            Headers = {
                ['Content-Type'] = 'application/json',
            },
            Body = httpService:JSONEncode({
                version = 5,
                bytecode = crypt.base64.encode(bytecode)
            })
        })

        local decoded = httpService:JSONDecode(response.Body)
        if decoded.status ~= 'ok' then
            return `decompilation failed: { decoded.status }`
        end

        return decoded.output
    end

    getgenv().decompile = decompile

    print('Checking if user exists..')
    game:GetService("StarterGui"):SetCore("SendNotification",{
        Title = "Notification",
        Text = "Please wait.."
    })
    game:GetService("StarterGui"):SetCore("SendNotification",{
        Title = "Welcome "..getgenv()._Information_['_HostNameUser_'].. "",
        Text = "Successfully completed, enjoy to exploit with website! Exploit: "..__ExecuterName,
    })
    

    local response = request(
        {
            Url = url,
            Method = 'GET',
            Headers = {
                ["Content-Type"] = "application/json"
            }
        }
    )

    if response.Success == true then
        while true do
            task.wait(0.2)
            if game:HttpGet(url) ~= '{"error":"Script not found."}' then
                print(game:HttpGet(url))
            end
        end
    else
        game:GetService("StarterGui"):SetCore("SendNotification",{
            Title = "Error.",
            Text = "We got an error, please report this to support. Open F9 for see the error message",
        })
        print(response.Body)
    end 

else
    print("Not supported yet.")
end


```
