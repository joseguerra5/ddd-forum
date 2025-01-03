import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objecs/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionAttatchment } from './question-attachment'
import { QuestionAttatchmentList } from './question-attachment-list'
export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  attachments: QuestionAttatchmentList
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }
  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  // podemos setar informação mesmo que não esteja mapeada na entidade
  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  // mostra resumo com 120 caracteres e concatena com ...
  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: QuestionAttatchmentList) {
    this.props.attachments = attachments
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  // metodo privado para atualizar o updatedAt
  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attatchments: props.attachments ?? new QuestionAttatchmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }
}
