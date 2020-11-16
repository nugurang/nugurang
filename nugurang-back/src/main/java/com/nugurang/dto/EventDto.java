package com.nugurang.dto;

import java.time.OffsetDateTime;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {
    @NotNull
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private OffsetDateTime recruitingStart;
    @NotNull
    private OffsetDateTime recruitingEnd;
    @NotNull
    private OffsetDateTime eventStart;
    @NotNull
    private OffsetDateTime eventEnd;
}
