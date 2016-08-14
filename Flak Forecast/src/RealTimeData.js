'use strict';

var PushAPI        = require('../../Common/src/API/PushAPI.js');
var GainExperience = require('../../Common/src/API/Data/GainExperience.js');

var RealTimeData = {
    connect: function (onEvent) {
        var eventIds = [
            283, // Galaxy Damage
            284, // Liberator Damage
            286, // Mosquito Damage
            287, // Reaver Damage
            288, // Scythe Damage
            508  // Valkyrie Damage
        ];

        // Transform the array of eventIds to full event names
        var eventNames = eventIds.map(function(eventId) {
            return 'GainExperience_experience_id_' + eventId;
        });

        // Build the complete query string
        var query = PushAPI.buildQuery(eventNames);

        // Connect to the real time API and begin receiving events
        PushAPI.connect(function(data) {
            // Only events with a payload (those we're interested in)
            if(!data.payload) {
                return;
            }
            var gainExperience = new GainExperience(
                data.payload.loadout_id,
                data.payload.world_id,
                data.payload.zone_id
            );
            onEvent(gainExperience);
        }, query);
    }
};

module.exports = RealTimeData;