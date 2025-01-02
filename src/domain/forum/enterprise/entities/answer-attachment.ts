import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AnswerAttatchmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}
export class AnswerAttatchment extends Entity<AnswerAttatchmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttatchmentProps, id?: UniqueEntityId) {
    const attatchment = new AnswerAttatchment(props, id)

    return attatchment
  }
}