#[macro_use]
extern crate clap;
extern crate sawtooth_sdk;

mod handler;

use sawtooth_sdk::processor::TransactionProcessor;
use handler::PirateHandler;


fn main() {
    let matches = clap_app!(intkey =>
        (version: crate_version!())
        (about: "PirateTalk Transaction Processor (Rust)")
        (@arg connect: -C --connect +takes_value
         "connection endpoint for validator"))
        .get_matches();

    let endpoint = matches
        .value_of("connect")
        .unwrap_or("tcp://localhost:4004");

    let handler = PirateHandler::new();
    let mut processor = TransactionProcessor::new(endpoint);
    processor.add_handler(&handler);

    println!("YARRRR READY TO TALK LIKE A PIRATE!!!");
    processor.start();
}
