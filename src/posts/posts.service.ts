import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePostDto } from './dto/update-post.dto';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';
import { FindFamilyDTO } from './dto/find-family.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  @InjectModel(Post.name)
  private readonly postModel: Model<Post>;

  @InjectModel(Comment.name)
  private readonly commentModel: Model<Comment>;

  create(
    createPostDto: CreatePostDto & {
      postedBy: string;
      date: Date;
      userId: string;
    },
  ) {
    return this.postModel.create({
      ...createPostDto,
      postedBy: createPostDto.postedBy,
    });
  }

  delete(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }

  async createComment(
    postId: string,
    newComment: { text: string; userId: string },
  ) {
    const comment = await this.commentModel.create(newComment);
    return this.postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true },
    );
  }

  deleteComment(commentId: string) {
    return this.commentModel.findByIdAndDelete(commentId);
  }

  findAll() {
    return this.postModel.find().populate('postedBy').populate('comments');
  }

  findOne(id: string) {
    return this.postModel
      .findById(id)
      .populate('postedBy')
      .populate('comments');
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  findAllFamilyPosts(findFamilyDTO: FindFamilyDTO) {
    return this.postModel
      .find({ familyId: { $in: findFamilyDTO.familyIds } })
      .populate('postedBy')
      .skip(findFamilyDTO.skip)
      .limit(findFamilyDTO.limit);
  }
}
