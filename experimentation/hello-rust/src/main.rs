fn main() {
    // let x : i32 = 1000;
    println!("{}","123".len());
    println!("{}",dice());

    let x = "out";
    {
        //this isa different x
        let x = "in";
        println!("{}", x);
    }
    println!("{}", x);

    let _x = "heluu";
    let x = {"heluuu"};
    println!("{}", x);

    let a = {
        let y = 1;
        let z = 2;
        y + z
    };
    println!("{}", a);
}

fn dice () -> i32 {
    10
}