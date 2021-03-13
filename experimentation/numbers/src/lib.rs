pub fn say_hello() {
    println!("hello world!!!! -- from lib.rs");
}
pub fn print(num: u8) -> () {
    let numbers: Vec<u8> = generate_sequence(num);
    output_sequence(&numbers);
    
}
fn generate_sequence(limit: u8) -> Vec<u8> {
    // let mut numbers = Vec::new();
    // for n in 1..=limit  {
    //     numbers.push(n);
    // }
    // numbers
    (1..=limit).collect()
}
fn output_sequence(numbers: &[u8]) {
    for n in numbers {
        println!("{}", n);
    }
}

#[test]
fn generate_sequence_should_work() {
    let result = generate_sequence(3);
    assert_eq!(result, &[1,2,3]);
}