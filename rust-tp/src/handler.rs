use std::iter::repeat;
use sawtooth_sdk::processor::handler::ApplyError;
use sawtooth_sdk::processor::handler::TransactionContext;
use sawtooth_sdk::processor::handler::TransactionHandler;
use sawtooth_sdk::messages::processor::TpProcessRequest;


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
        let payload = txn.get_payload();

        let uuid = signature[96..].to_string();
        let filler = repeat("a").take(32).collect::<String>();
        let address = "aaaaaa".to_string() + &filler + &uuid;

        println!("YARRRR SAVING A MESSAGE!!!!");
        context.set_state(&address, payload);

        Ok(())
    }
}
