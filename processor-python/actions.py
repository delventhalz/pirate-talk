from uuid import uuid4
import json

from pirate_preprocessor import category_ids


def is_clearer(context, initiator_pubkey):
    return True

def issue_bond(context, initiator_pubkey, message_dict):

    new_state_dict = {}
    # verify clearer has permissions
    if not is_clearer(context, initiator_pubkey):
        return
        
    # create bond type
    bond_type_address = category_ids.get_bond_type_address(message_dict['uuid'])
    bond_type_data = message_dict.copy()
    del bond_type_data['uuid']
    bond_type_data['serials'] = sorted([
            uuid4().hex for _ in range(message_dict['num_issued'])
            ])
            
    new_state_dict[bond_type_address] = bond_type_data

    # create bonds
    for bond_uuid in bond_type_data['serials']:
        

    # assign bonds to owner

    context.set_state(new_state_dict)

    




def buy_bond(bankid, company_name, num_bonds, ownerpubkey)




def traders_trade()