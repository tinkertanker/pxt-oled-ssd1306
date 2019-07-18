//% color="#00CC99"
namespace OLED {
    const SSD1306_SETCONTRAST = 0x81
    const SSD1306_SETCOLUMNADRESS = 0x21
    const SSD1306_SETPAGEADRESS = 0x22
    const SSD1306_DISPLAYALLON_RESUME = 0xA4
    const SSD1306_DISPLAYALLON = 0xA5
    const SSD1306_NORMALDISPLAY = 0xA6
    const SSD1306_INVERTDISPLAY = 0xA7
    const SSD1306_DISPLAYOFF = 0xAE
    const SSD1306_DISPLAYON = 0xAF
    const SSD1306_SETDISPLAYOFFSET = 0xD3
    const SSD1306_SETCOMPINS = 0xDA
    const SSD1306_SETVCOMDETECT = 0xDB
    const SSD1306_SETDISPLAYCLOCKDIV = 0xD5
    const SSD1306_SETPRECHARGE = 0xD9
    const SSD1306_SETMULTIPLEX = 0xA8
    const SSD1306_SETLOWCOLUMN = 0x00
    const SSD1306_SETHIGHCOLUMN = 0x10
    const SSD1306_SETSTARTLINE = 0x40
    const SSD1306_MEMORYMODE = 0x20
    const SSD1306_COMSCANINC = 0xC0
    const SSD1306_COMSCANDEC = 0xC8
    const SSD1306_SEGREMAP = 0xA0
    const SSD1306_CHARGEPUMP = 0x8D
    const chipAdress = 0x3C
    const xOffset = 0
    const yOffset = 0
    let charX = 0
    let charY = 0
    let displayWidth = 128
    let displayHeight = 64 / 8
    let screenSize = 0
    let font: Array<Array<number>>
    let loadStarted: boolean;
    let loadPercent: number;
    function command(cmd: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x00
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }
    //% block="clear OLED display"
    //% weight=3
    export function clear() {
        loadStarted = false
        loadPercent = 0
        command(SSD1306_SETCOLUMNADRESS)
        command(0x00)
        command(displayWidth - 1)
        command(SSD1306_SETPAGEADRESS)
        command(0x00)
        command(displayHeight - 1)
        let data = pins.createBuffer(17);
        data[0] = 0x40; // Data Mode
        for (let i = 1; i < 17; i++) {
            data[i] = 0x00
        }
        // send display buffer in 16 byte chunks
        for (let i = 0; i < screenSize; i += 16) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        charX = xOffset
        charY = yOffset
    }

    function drawLoadingFrame() {
        command(SSD1306_SETCOLUMNADRESS)
        command(0x00)
        command(displayWidth - 1)
        command(SSD1306_SETPAGEADRESS)
        command(0x00)
        command(displayHeight - 1)
        let col = 0
        let page = 0
        let data = pins.createBuffer(17);
        data[0] = 0x40; // Data Mode
        let i = 1
        for (let page = 0; page < displayHeight; page++) {
            for (let col = 0; col < displayWidth; col++) {
                if (page === 3 && col > 12 && col < displayWidth - 12) {
                    data[i] = 0x60
                } else if (page === 5 && col > 12 && col < displayWidth - 12) {
                    data[i] = 0x06
                } else if (page === 4 && (col === 12 || col === 13 || col === displayWidth - 12 || col === displayWidth - 13)) {
                    data[i] = 0xFF
                } else {
                    data[i] = 0x00
                }
                if (i === 16) {
                    pins.i2cWriteBuffer(chipAdress, data, false)
                    i = 1
                } else {
                    i++
                }

            }
        }
        charX = 30
        charY = 2
        writeString("Loading:")
    }
    function drawLoadingBar(percent: number) {
        charX = 78
        charY = 2
        let num = Math.floor(percent)
        writeNum(num)
        writeString("%")
        let width = displayWidth - 14 - 13
        let lastStart = width * (loadPercent / displayWidth)
        command(SSD1306_SETCOLUMNADRESS)
        command(14 + lastStart)
        command(displayWidth - 13)
        command(SSD1306_SETPAGEADRESS)
        command(4)
        command(5)
        let data = pins.createBuffer(2);
        data[0] = 0x40; // Data Mode
        data[1] = 0x7E
        for (let i = lastStart; i < width * (Math.floor(percent) / 100); i++) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        loadPercent = num
    }

    //% block="draw loading bar at $percent percent"
    //% percent.min=0 percent.max=100
    //% weight=2
    export function drawLoading(percent: number) {
        if (loadStarted) {
            drawLoadingBar(percent)
        } else {
            drawLoadingFrame()
            drawLoadingBar(percent)
            loadStarted = true
        }
    }


    //% block="show (without newline) string $str"
    //% weight=6
    export function writeString(str: string) {
        for (let i = 0; i < str.length(); i++) {
            if (charX > displayWidth - 6) {
                newLine()
            }
            drawChar(charX, charY, str.charAt(i))
            charX += 6
        }
    }
    //% block="show (without newline) number $n"
    //% weight=5
    export function writeNum(n: number) {
        let numString = n.toString()
        writeString(numString)
    }
    //% block="show string $str"
    //% weight=8
    export function writeStringNewLine(str: string) {
        writeString(str)
        newLine()
    }
    //% block="show number $n"
    //% weight=7
    export function writeNumNewLine(n: number) {
        writeNum(n)
        newLine()
    }
    //% block="insert newline"
    //% weight=4
    export function newLine() {
        charY++
        charX = xOffset
    }
    function drawChar(x: number, y: number, c: string) {
        command(SSD1306_SETCOLUMNADRESS)
        command(x)
        command(x + 5)
        command(SSD1306_SETPAGEADRESS)
        command(y)
        command(y + 1)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let i = 0; i < 6; i++) {
            if (i === 5) {
                line[1] = 0x00
            } else {
                let charIndex = c.charCodeAt(0)
                if (charIndex <= 126) {
                    line[1] = font[charIndex][i]
                } else {
                    line[1] = font[127][i]
                }

            }
            pins.i2cWriteBuffer(chipAdress, line, false)
        }

    }
    function drawShape(pixels: Array<Array<number>>) {
        let x1 = displayWidth
        let y1 = displayHeight * 8
        let x2 = 0
        let y2 = 0
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i][0] < x1) {
                x1 = pixels[i][0]
            }
            if (pixels[i][0] > x2) {
                x2 = pixels[i][0]
            }
            if (pixels[i][1] < y1) {
                y1 = pixels[i][1]
            }
            if (pixels[i][1] > y2) {
                y2 = pixels[i][1]
            }
        }
        let page1 = Math.floor(y1 / 8)
        let page2 = Math.floor(y2 / 8)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let x = x1; x <= x2; x++) {
            for (let page = page1; page <= page2; page++) {
                line[1] = 0x00
                for (let i = 0; i < pixels.length; i++) {
                    if (pixels[i][0] === x) {
                        if (Math.floor(pixels[i][1] / 8) === page) {
                            line[1] |= Math.pow(2, (pixels[i][1] % 8))
                        }
                    }
                }
                if (line[1] !== 0x00) {
                    command(SSD1306_SETCOLUMNADRESS)
                    command(x)
                    command(x + 1)
                    command(SSD1306_SETPAGEADRESS)
                    command(page)
                    command(page + 1)
                    //line[1] |= pins.i2cReadBuffer(chipAdress, 2)[1]
                    pins.i2cWriteBuffer(chipAdress, line, false)
                }
            }
        }
    }

    //% block="draw line from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=1
    export function drawLine(x0: number, y0: number, x1: number, y1: number) {
        let pixels: Array<Array<number>> = []
        let kx, ky, c, i, xx, yy, dx, dy;
        let targetX = x1
        let targetY = y1
        x1 -= x0; kx = 0; if (x1 > 0) kx = +1; if (x1 < 0) { kx = -1; x1 = -x1; } x1++;
        y1 -= y0; ky = 0; if (y1 > 0) ky = +1; if (y1 < 0) { ky = -1; y1 = -y1; } y1++;
        if (x1 >= y1) {
            c = x1
            for (i = 0; i < x1; i++ , x0 += kx) {
                pixels.push([x0, y0])
                c -= y1; if (c <= 0) { if (i != x1 - 1) pixels.push([x0 + kx, y0]); c += x1; y0 += ky; if (i != x1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        } else {
            c = y1
            for (i = 0; i < y1; i++ , y0 += ky) {
                pixels.push([x0, y0])
                c -= x1; if (c <= 0) { if (i != y1 - 1) pixels.push([x0, y0 + ky]); c += y1; x0 += kx; if (i != y1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        }
        drawShape(pixels)
    }

    //% block="draw rectangle from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=0
    export function drawRectangle(x0: number, y0: number, x1: number, y1: number) {
        drawLine(x0, y0, x1, y0)
        drawLine(x0, y1, x1, y1)
        drawLine(x0, y0, x0, y1)
        drawLine(x1, y0, x1, y1)
    }
    //% block="initialize OLED with width $width height $height"
    //% width.defl=128
    //% height.defl=64
    //% weight=9
    export function init(width: number, height: number) {
        command(SSD1306_DISPLAYOFF);
        command(SSD1306_SETDISPLAYCLOCKDIV);
        command(0x80);                                  // the suggested ratio 0x80
        command(SSD1306_SETMULTIPLEX);
        command(0x3F);
        command(SSD1306_SETDISPLAYOFFSET);
        command(0x0);                                   // no offset
        command(SSD1306_SETSTARTLINE | 0x0);            // line #0
        command(SSD1306_CHARGEPUMP);
        command(0x14);
        command(SSD1306_MEMORYMODE);
        command(0x00);                                  // 0x0 act like ks0108
        command(SSD1306_SEGREMAP | 0x1);
        command(SSD1306_COMSCANDEC);
        command(SSD1306_SETCOMPINS);
        command(0x12);
        command(SSD1306_SETCONTRAST);
        command(0xCF);
        command(SSD1306_SETPRECHARGE);
        command(0xF1);
        command(SSD1306_SETVCOMDETECT);
        command(0x40);
        command(SSD1306_DISPLAYALLON_RESUME);
        command(SSD1306_NORMALDISPLAY);
        command(SSD1306_DISPLAYON);
        displayWidth = width
        displayHeight = height / 8
        screenSize = displayWidth * displayHeight
        charX = xOffset
        charY = yOffset
        font = [
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x3E, 0x5B, 0x4F, 0x5B, 0x3E],
            [0x3E, 0x6B, 0x4F, 0x6B, 0x3E],
            [0x1C, 0x3E, 0x7C, 0x3E, 0x1C],
            [0x18, 0x3C, 0x7E, 0x3C, 0x18],
            [0x1C, 0x57, 0x7D, 0x57, 0x1C],
            [0x1C, 0x5E, 0x7F, 0x5E, 0x1C],
            [0x00, 0x18, 0x3C, 0x18, 0x00],
            [0xFF, 0xE7, 0xC3, 0xE7, 0xFF],
            [0x00, 0x18, 0x24, 0x18, 0x00],
            [0xFF, 0xE7, 0xDB, 0xE7, 0xFF],
            [0x30, 0x48, 0x3A, 0x06, 0x0E],
            [0x26, 0x29, 0x79, 0x29, 0x26],
            [0x40, 0x7F, 0x05, 0x05, 0x07],
            [0x40, 0x7F, 0x05, 0x25, 0x3F],
            [0x5A, 0x3C, 0xE7, 0x3C, 0x5A],
            [0x7F, 0x3E, 0x1C, 0x1C, 0x08],
            [0x08, 0x1C, 0x1C, 0x3E, 0x7F],
            [0x14, 0x22, 0x7F, 0x22, 0x14],
            [0x5F, 0x5F, 0x00, 0x5F, 0x5F],
            [0x06, 0x09, 0x7F, 0x01, 0x7F],
            [0x00, 0x66, 0x89, 0x95, 0x6A],
            [0x60, 0x60, 0x60, 0x60, 0x60],
            [0x94, 0xA2, 0xFF, 0xA2, 0x94],
            [0x08, 0x04, 0x7E, 0x04, 0x08],
            [0x10, 0x20, 0x7E, 0x20, 0x10],
            [0x08, 0x08, 0x2A, 0x1C, 0x08],
            [0x08, 0x1C, 0x2A, 0x08, 0x08],
            [0x1E, 0x10, 0x10, 0x10, 0x10],
            [0x0C, 0x1E, 0x0C, 0x1E, 0x0C],
            [0x30, 0x38, 0x3E, 0x38, 0x30],
            [0x06, 0x0E, 0x3E, 0x0E, 0x06],
            [0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x5F, 0x00, 0x00],
            [0x00, 0x07, 0x00, 0x07, 0x00],
            [0x14, 0x7F, 0x14, 0x7F, 0x14],
            [0x24, 0x2A, 0x7F, 0x2A, 0x12],
            [0x23, 0x13, 0x08, 0x64, 0x62],
            [0x36, 0x49, 0x56, 0x20, 0x50],
            [0x00, 0x08, 0x07, 0x03, 0x00],
            [0x00, 0x1C, 0x22, 0x41, 0x00],
            [0x00, 0x41, 0x22, 0x1C, 0x00],
            [0x2A, 0x1C, 0x7F, 0x1C, 0x2A],
            [0x08, 0x08, 0x3E, 0x08, 0x08],
            [0x00, 0x80, 0x70, 0x30, 0x00],
            [0x08, 0x08, 0x08, 0x08, 0x08],
            [0x00, 0x00, 0x60, 0x60, 0x00],
            [0x20, 0x10, 0x08, 0x04, 0x02],
            [0x3E, 0x51, 0x49, 0x45, 0x3E],
            [0x00, 0x42, 0x7F, 0x40, 0x00],
            [0x72, 0x49, 0x49, 0x49, 0x46],
            [0x21, 0x41, 0x49, 0x4D, 0x33],
            [0x18, 0x14, 0x12, 0x7F, 0x10],
            [0x27, 0x45, 0x45, 0x45, 0x39],
            [0x3C, 0x4A, 0x49, 0x49, 0x31],
            [0x41, 0x21, 0x11, 0x09, 0x07],
            [0x36, 0x49, 0x49, 0x49, 0x36],
            [0x46, 0x49, 0x49, 0x29, 0x1E],
            [0x00, 0x00, 0x14, 0x00, 0x00],
            [0x00, 0x40, 0x34, 0x00, 0x00],
            [0x00, 0x08, 0x14, 0x22, 0x41],
            [0x14, 0x14, 0x14, 0x14, 0x14],
            [0x00, 0x41, 0x22, 0x14, 0x08],
            [0x02, 0x01, 0x59, 0x09, 0x06],
            [0x3E, 0x41, 0x5D, 0x59, 0x4E],
            [0x7C, 0x12, 0x11, 0x12, 0x7C],
            [0x7F, 0x49, 0x49, 0x49, 0x36],
            [0x3E, 0x41, 0x41, 0x41, 0x22],
            [0x7F, 0x41, 0x41, 0x41, 0x3E],
            [0x7F, 0x49, 0x49, 0x49, 0x41],
            [0x7F, 0x09, 0x09, 0x09, 0x01],
            [0x3E, 0x41, 0x41, 0x51, 0x73],
            [0x7F, 0x08, 0x08, 0x08, 0x7F],
            [0x00, 0x41, 0x7F, 0x41, 0x00],
            [0x20, 0x40, 0x41, 0x3F, 0x01],
            [0x7F, 0x08, 0x14, 0x22, 0x41],
            [0x7F, 0x40, 0x40, 0x40, 0x40],
            [0x7F, 0x02, 0x1C, 0x02, 0x7F],
            [0x7F, 0x04, 0x08, 0x10, 0x7F],
            [0x3E, 0x41, 0x41, 0x41, 0x3E],
            [0x7F, 0x09, 0x09, 0x09, 0x06],
            [0x3E, 0x41, 0x51, 0x21, 0x5E],
            [0x7F, 0x09, 0x19, 0x29, 0x46],
            [0x26, 0x49, 0x49, 0x49, 0x32],
            [0x03, 0x01, 0x7F, 0x01, 0x03],
            [0x3F, 0x40, 0x40, 0x40, 0x3F],
            [0x1F, 0x20, 0x40, 0x20, 0x1F],
            [0x3F, 0x40, 0x38, 0x40, 0x3F],
            [0x63, 0x14, 0x08, 0x14, 0x63],
            [0x03, 0x04, 0x78, 0x04, 0x03],
            [0x61, 0x59, 0x49, 0x4D, 0x43],
            [0x00, 0x7F, 0x41, 0x41, 0x41],
            [0x02, 0x04, 0x08, 0x10, 0x20],
            [0x00, 0x41, 0x41, 0x41, 0x7F],
            [0x04, 0x02, 0x01, 0x02, 0x04],
            [0x40, 0x40, 0x40, 0x40, 0x40],
            [0x00, 0x03, 0x07, 0x08, 0x00],
            [0x20, 0x54, 0x54, 0x78, 0x40],
            [0x7F, 0x28, 0x44, 0x44, 0x38],
            [0x38, 0x44, 0x44, 0x44, 0x28],
            [0x38, 0x44, 0x44, 0x28, 0x7F],
            [0x38, 0x54, 0x54, 0x54, 0x18],
            [0x00, 0x08, 0x7E, 0x09, 0x02],
            [0x18, 0xA4, 0xA4, 0x9C, 0x78],
            [0x7F, 0x08, 0x04, 0x04, 0x78],
            [0x00, 0x44, 0x7D, 0x40, 0x00],
            [0x20, 0x40, 0x40, 0x3D, 0x00],
            [0x7F, 0x10, 0x28, 0x44, 0x00],
            [0x00, 0x41, 0x7F, 0x40, 0x00],
            [0x7C, 0x04, 0x78, 0x04, 0x78],
            [0x7C, 0x08, 0x04, 0x04, 0x78],
            [0x38, 0x44, 0x44, 0x44, 0x38],
            [0xFC, 0x18, 0x24, 0x24, 0x18],
            [0x18, 0x24, 0x24, 0x18, 0xFC],
            [0x7C, 0x08, 0x04, 0x04, 0x08],
            [0x48, 0x54, 0x54, 0x54, 0x24],
            [0x04, 0x04, 0x3F, 0x44, 0x24],
            [0x3C, 0x40, 0x40, 0x20, 0x7C],
            [0x1C, 0x20, 0x40, 0x20, 0x1C],
            [0x3C, 0x40, 0x30, 0x40, 0x3C],
            [0x44, 0x28, 0x10, 0x28, 0x44],
            [0x4C, 0x90, 0x90, 0x90, 0x7C],
            [0x44, 0x64, 0x54, 0x4C, 0x44],
            [0x00, 0x08, 0x36, 0x41, 0x00],
            [0x00, 0x00, 0x77, 0x00, 0x00],
            [0x00, 0x41, 0x36, 0x08, 0x00],
            [0x02, 0x01, 0x02, 0x04, 0x02],
            [0xFF, 0xFF, 0xFF, 0xFF, 0xFF]]
        loadStarted = false
        loadPercent = 0
        clear()
    }
} 