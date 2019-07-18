// tests go here; this will not be compiled when this package is used as a library

OLED.init(128, 64)
for (let i = 0; i <= 100; i += 100) {
    OLED.drawLoading(i)
}
OLED.clear()
for (let i = 0; i <= 100; i += 50) {
    OLED.drawLoading(i)
}
OLED.clear()
for (let i = 0; i <= 100; i += 10) {
    OLED.drawLoading(i)
}
OLED.clear()
for (let i = 0; i <= 100; i += 1) {
    OLED.drawLoading(i)
}
OLED.clear()