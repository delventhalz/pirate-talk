from uuid import uuid4
import json

from pirate_preprocessor import category_ids


def is_clearer(context, initiator_pubkey):
    return True

def issue_bond(context, initiator_pubkey, message_dict):

        #check if bank exists
    new_state_dict = {}
    # verify clearer has permissions
    if not is_clearer(context, initiator_pubkey):
        return
        
    # create bond type
    issuance_address = category_ids.get_issuance_address(message_dict['uuid'])
    issuance_data = message_dict.copy()
    issuance_data = {
            ''
    }
    del issuance_data['uuid']
    issuance_data['serials'] = sorted([
                uuid4().hex for _ in range(message_dict['num_issued'])
            ])
            
    new_state_dict[issuance_address] = issuance_data  # TODO make this deterministic

    # create bonds
    for bond_uuid in issuance_data['serials']:
        
        new_state_dict[get_issuance_address(bond_uuid)] = {
                'bank_uuid': message_dict['bank_uuid'],
                'issuance_uuid': bond_uuid
        }

    # assign bonds to owner

    context.set_state(new_state_dict)

    




def buy_bond(context, initiator_pubkey, message_dict):
        # verify clearer has permissions
        # find onwer's bonds
        #




def traders_trade()