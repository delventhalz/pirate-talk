from uuid import uuid4
import json

from pirate_preprocessor import category_ids


def is_clearer(context, initiator_pubkey):
    clearer_addr = category_ids.get_clearer_address(initiator_pubkey)
    state_info = context.get_state([clearer_addr])
    if state_info[clearer_addr] is None:
        return False
    return True

def is_bank(context, bank_pubkey):
    bank_address = get_owner_address(bank_pubkey)
    bank_state_info = context.get_state([bank_address])
    if bank_info[bank_address] is None:
        return False
    else:
        bank_data = json.loads(bank_info[bank_address].decode('utf-8'))
        if bank_data['type'] != 'bank':
            return False
    return True

def issue_bond(context, initiator_pubkey, message_dict):

    if not is_bank(context, message_dict['bank_pubkey'])
        return
    if not is_clearer(context, initiator_pubkey):
        return

    new_state_dict = {}
        
    # create bond type
    issuance_address = category_ids.get_issuance_address(message_dict['issuance_uuid'])
    issuance_data = {
        'company_pubkey': message_dict['company_pubkey'],
        'bank_pubkey': message_dict['bank_pubkey'],
        'num_issued': message_dict['num_issued'],
        'denomination': message_dict['denomination'],
        'interest_rate': message_dict['interest_rate'],
        'maturity_date': message_dict['maturity_date']
    }

    issuance_data['serials'] = sorted([
                uuid4().hex for _ in range(message_dict['num_issued'])
            ])
            
    new_state_dict[issuance_address] = json.dumps(issuance_data, sort_keys=True)

    # create bonds
    for bond_uuid in issuance_data['serials']:
        new_state_dict[get_issuance_address(bond_uuid)] = {
                'owner_uuid': message_dict['bank_uuid'],
                'issuance_uuid': bond_uuid
        }

    # assign bonds to owner
    bank_bonds_address = category_ids.get_bank_bonds_address(message_dict['bank_pubkey'], message_dict['issuance_uuid'])
    new_state_dict[bank_bonds_address] = {
        'num_owned': len(issuance_data['serials']),
        'serials': issuance_data['serials']
    }

    context.set_state(new_state_dict)

def buy_bonds_otc(context, initiator_pubkey, message_dict):
    pass

def initiate_trade(context, initiator_pubkey, message_dict):
    pass

def cancel_trade(context, initiator_pubkey, message_dict):
    pass

def accept_trade(context, initiator_pubkey, message_dict):
    pass

def add_crypto(context, initiator_pubkey, message_dict):
    pass
