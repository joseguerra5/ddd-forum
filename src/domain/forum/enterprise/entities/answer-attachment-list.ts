import { WatchedList } from "@/core/entities/watched-list";
import { AnswerAttatchment } from "./answer-attachment";

export class AnswerAttatchmentList extends WatchedList<AnswerAttatchment> {
  compareItems(a: AnswerAttatchment, b: AnswerAttatchment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}