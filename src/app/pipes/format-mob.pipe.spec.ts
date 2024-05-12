import { FormatMobPipe } from "./format-mob.pipe"


describe("FormatMobPipe",()=>{
    it("Should format no to INR by default",()=>{
        const pipe = new FormatMobPipe()
        const res = pipe.transform(12345)
        expect(res).toEqual("+91-12345")
    })
    it("Should format no to USA",()=>{
        const pipe = new FormatMobPipe()
        const res = pipe.transform(12345,"USA")
        expect(res).toEqual("+1-12345")
    })
})