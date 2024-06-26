package com.actif.delivery;


import com.actif.POC.POC;
import com.actif.customer.Customer;
import com.actif.delivery.relationshipProperties.DeposedAt;
import com.actif.delivery.relationshipProperties.RemovedBy;
import com.actif.delivery.relationshipProperties.TakenBy;
import com.actif.packet.Packet;
import com.actif.packet.relationshipProperties.IgnoredBy;
import com.actif.packet.relationshipProperties.IncludedIn;
import com.actif.packet.relationshipProperties.SelectedBy;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Node
public class Delivery {

    @Id
    @GeneratedValue
    private Long id;

    private Long cost;
    private Long distance;
    private LocalDateTime estimatedDeliveryDate;
    private Long status;

//    @Relationship(type = "ASSIGNED_TO")
//    public AssignedTo assignedTo;

    @Relationship(type = "TAKEN_BY")
    public TakenBy takenBy;

    @Relationship(type = "INCLUDED_IN", direction = Relationship.Direction.INCOMING)
    public IncludedIn includedIn;

    @Relationship(type = "SELECTED_BY")
    public SelectedBy selectedBy;

    @Relationship(type = "IGNORED_BY")
    public IgnoredBy ignoredBy;

    @Relationship(type = "INTENDED_FOR")
    public POC pocIntended;

    @Relationship(type = "START_FROM")
    public POC pocSource;

    @Relationship(type = "REMOVED_BY")
    public RemovedBy removedBy;

//    @Relationship(type = "DEPOSED_AT")
//    public List<DeposedAt> deposedAts;

    @Relationship(type = "DEPOSED_AT", direction = Relationship.Direction.OUTGOING)
    public DeposedAt deposedAt;


    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime lastUpdatedOn;
}


