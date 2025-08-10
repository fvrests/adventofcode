use std::fs::read_to_string;

fn main() {
    let file = read_to_string("./src/test-input.txt").unwrap();
    file.lines().for_each(|line| {
        println!("{}", line);
        let mut numbers: Vec<i32> = Vec::new();
        for char in line.chars() {
            if char.is_digit(10) {
                println!("{}", char);
                numbers.push(char.to_digit(10));
                println!("{:?}", numbers);
            }
        }
    })
}
