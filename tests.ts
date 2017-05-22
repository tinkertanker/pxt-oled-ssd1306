// tests go here; this will not be compiled when this package is used as a library

OLED.init(64, 128)
OLED.showString("hello, world!")
OLED.showString("counter:")
let item = 0
basic.forever(() => {
    basic.pause(1000)
    item += 1
    OLED.showNumber(item)
})

