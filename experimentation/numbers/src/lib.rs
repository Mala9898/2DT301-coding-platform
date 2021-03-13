pub fn say_hello() {
    println!("hello world!!!! -- from lib.rs");
}
pub fn print() -> () {
    let numbers = [1,2,3,4,5];
    for n in numbers.iter() {
        println!("{}", n);
    }
    output_sequence(numbers);
    // let numbers = vec![1,2,3,4,5];
    // for n in numbers {
    //     println!("{}", n);
    // }
}

fn output_sequence(numbers: [u8; 5]) {
    for n in numbers.iter() {
        println!("{}", n);
    }
}