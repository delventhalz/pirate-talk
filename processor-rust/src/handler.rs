use std::iter::repeat;
use sawtooth_sdk::processor::handler::ApplyError;
use sawtooth_sdk::processor::handler::TransactionContext;
use sawtooth_sdk::processor::handler::TransactionHandler;
use sawtooth_sdk::messages::processor::TpProcessRequest;


fn piratify(msg: String) -> String {
    let rs = repeat("r").take(msg.len() / 3 + 1).collect::<String>();
    let excls = repeat("!").take(msg.len() / 5 + 1).collect::<String>();
    format!("{}{} {}{}", "ya", rs, msg, excls).to_uppercase()
}

pub struct PirateHandler {
    family_name: String,
    family_versions: Vec<String>,
    namespaces: Vec<String>,
}

impl PirateHandler {
    pub fn new() -> PirateHandler {
        PirateHandler {
            family_name: "pirate-talk".to_string(),
            family_versions: vec!["0.0".to_string()],
            namespaces: vec!["aaaaaa".to_string()],
        }
    }
}

impl TransactionHandler for PirateHandler {
    fn family_name(&self) -> String {
        self.family_name.clone()
    }

    fn family_versions(&self) -> Vec<String> {
        self.family_versions.clone()
    }

    fn namespaces(&self) -> Vec<String> {
        self.namespaces.clone()
    }

    fn apply(
        &self,
        txn: &TpProcessRequest,
        context: &mut TransactionContext,
    ) -> Result<(), ApplyError> {
        let signature = txn.get_signature();
        let message = match String::from_utf8(txn.get_payload().to_vec()) {
            Err(e) => return Err(ApplyError::InvalidTransaction(e.to_string())),
            Ok(payload) => payload
        };

        let uuid = signature[96..].to_string();
        let filler = repeat("a").take(32).collect::<String>();
        let address = "aaaaaa".to_string() + &filler + &uuid;

        let pirate_message = piratify(message);
        println!("{}", pirate_message);

        match context.set_state(&address, pirate_message.as_bytes()) {
            Err(e) => Err(ApplyError::InternalError(e.to_string())),
            Ok(_) => Ok(())
        }
    }
}
